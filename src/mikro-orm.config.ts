import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Course } from "./entities/Course";
import { User } from "./entities/User";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Course, User],
    dbName: 'test_class',
    user: 'postgres',
    password: 'postgres',
    debug: !__prod__,
    type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];