"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Course_1 = require("./../entities/Course");
let CourseResolver = class CourseResolver {
    courses({ em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield em.find(Course_1.Course, {});
            return courses;
        });
    }
    course(id, { em }) {
        return em.findOne(Course_1.Course, { id });
    }
    createCourse(title, description, { req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = em.create(Course_1.Course, { title, description });
            yield em.persistAndFlush(course);
            return course;
        });
    }
    updateCourse(id, title, description, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield em.findOne(Course_1.Course, { id, description });
            if (!course) {
                return null;
            }
            if (typeof title !== 'undefined' && typeof description !== 'undefined') {
                course.title = title;
                course.description = description;
                yield em.persistAndFlush(course);
            }
            return course;
        });
    }
    deleteCourse(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield em.nativeDelete(Course_1.Course, { id });
            }
            catch (_a) {
                return false;
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Course_1.Course], { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "courses", null);
__decorate([
    type_graphql_1.Query(() => Course_1.Course, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "course", null);
__decorate([
    type_graphql_1.Mutation(() => Course_1.Course),
    __param(0, type_graphql_1.Arg('title')),
    __param(1, type_graphql_1.Arg('description')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "createCourse", null);
__decorate([
    type_graphql_1.Mutation(() => Course_1.Course, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('title', () => String, { nullable: true })),
    __param(2, type_graphql_1.Arg('description', () => String, { nullable: true })),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "updateCourse", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "deleteCourse", null);
CourseResolver = __decorate([
    type_graphql_1.Resolver()
], CourseResolver);
exports.CourseResolver = CourseResolver;
//# sourceMappingURL=course.js.map