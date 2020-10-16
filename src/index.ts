import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import micoConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql'
import { TestResolver } from "./resolvers/test";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import cors from 'cors';
import { UserResolver } from './resolvers/user';
import { CourseResolver } from "./resolvers/course";

const main = async () => {

    const orm = await MikroORM.init(micoConfig);
    await orm.getMigrator().up();

    const app = express();  

    let RedisStore = connectRedis(session)
    let redisClient = redis.createClient()

    app.use(cors({
        origin: "http://localhost:3000", //Whatever the the client url is
        credentials: true
    }))

    
    app.use(
        session({
            name: "qid",
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000*60*60*24*365*10, //10yrs
                httpOnly: true,
                secure: __prod__, //Cookie only works in https
                sameSite: "lax" //CSRF
            },
            saveUninitialized: false,
            secret: "123asda56ydfsdfasvasdadsf",
            resave: false,
        })
    )

    // Adding graphql schema
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TestResolver, UserResolver, CourseResolver],
            validate: false,
        }),
        context: ({req, res}) => ({ em: orm.em, req, res })
    });

    apolloServer.applyMiddleware({ 
        app,
        cors: false
    })


    app.listen(4000, () => {
        console.log('server started at port 4000');
    })
}
main();