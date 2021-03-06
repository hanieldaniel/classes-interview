
import { MyContext } from '../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import argon2 from 'argon2';
import { EntityManager } from "@mikro-orm/postgresql";

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {

    @Query(() => [User])
    async users(
        @Ctx() { em }: MyContext
    ) {
        const courses = await em.find(User, {});
        return courses;
    }

    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { req, em }: MyContext
    ) {
        if (!req.session.userId) {
            return null;
        }

        const user = await em.findOne(User, { id: req.session.userId })
        return user;
    }



    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Arg('usertype') usertype: string,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {

        if (options.username.length <= 2) {
            return {
                errors: [{
                    field: "username",
                    message: "username too short"
                }]
            }
        }

        if (options.password.length <= 2) {
            return {
                errors: [{
                    field: "password",
                    message: "password has to be atleast 3"
                }]
            }
        }


        const hashedPassword = await argon2.hash(options.password);
        let user;

        try {
            const result = await (em as EntityManager).createQueryBuilder(User).getKnexQuery().insert(
                {
                    username: options.username,
                    password: hashedPassword,
                    usertype: usertype,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            )
            .returning("*");
            user = result[0];
        } catch (err) {
            if (err.code === "23505") {
                // Duplicate username error
                return {
                    errors: [{
                        field: "username",
                        message: "username already taken"
                    }]
                }
            }
        }

        // Auto login after register
        req.session.userId = user.id;

        return { user };
    }


    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {

        const user = await em.findOne(User, { username: options.username })

        if (!user) {
            return {
                errors: [{
                    field: "username",
                    message: "Username does not exist"
                }]
            }
        }

        const valid = await argon2.verify(user.password, options.password);

        if (!valid) {
            return {
                errors: [{
                    field: "password",
                    message: "incorrect Password"
                }]
            }
        }

        req.session.userId = user.id;

        return { user };
    }

}