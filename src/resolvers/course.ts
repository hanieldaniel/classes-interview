import { MyContext } from '../types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Course } from './../entities/Course';

@Resolver()
export class CourseResolver {

    // Get all
    @Query(() => [Course], { nullable: true })
    async courses(
        @Ctx() { em }: MyContext
    ) {
        const courses = await em.find(Course, {});
        return courses;
    }

    //Get one
    @Query(() => Course, { nullable: true })
    course(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ): Promise<Course | null> {
        return em.findOne(Course, { id });
    }


    // Add course
    @Mutation(() => Course)
    async createCourse(
        @Arg('title') title: string,
        @Arg('description') description: string,
        @Ctx() { req, em }: MyContext
    ): Promise<Course> {
        const course = em.create(Course, { title, description });
        await em.persistAndFlush(course)
        return course;
    }


    // Update course
    @Mutation(() => Course, { nullable: true })
    async updateCourse(
        @Arg('id') id: number,
        @Arg('title', () => String, { nullable: true }) title: string,
        @Arg('description', () => String, { nullable: true }) description: string,
        @Ctx() { em }: MyContext
    ): Promise<Course | null> {
        const course = await em.findOne(Course, { id, description });

        if (!course) {
            return null;
        }
        if (typeof title !== 'undefined' && typeof description !== 'undefined') {
            course.title = title;
            course.description = description;
            await em.persistAndFlush(course)
        }
        return course;
    }


    // Delete course
    @Mutation(() => Boolean)
    async deleteCourse(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        try {
            await em.nativeDelete(Course, { id })
        } catch {
            return false
        }
        return true;
    }

}