"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const Course_1 = require("./entities/Course");
const User_1 = require("./entities/User");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Course_1.Course, User_1.User],
    dbName: 'test_class',
    user: 'postgres',
    password: 'postgres',
    debug: !constants_1.__prod__,
    type: 'postgresql',
};
//# sourceMappingURL=mikro-orm.config.js.map