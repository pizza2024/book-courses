"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("./AuthController"));
const PublishedCourse_1 = __importDefault(require("../schemas/PublishedCourse"));
class PublishedCourseListController extends AuthController_1.default {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield PublishedCourse_1.default.find({})
                .populate('admin', '-username -createdAt -adminRole')
                .populate('teacher', '-username -createdAt')
                .populate('course', '-createdAt -admin');
            res.json({
                success: true,
                rows
            });
        });
    }
    post(req, res, next) {
        throw new Error("Method not implemented.");
    }
    put(req, res, next) {
        throw new Error("Method not implemented.");
    }
    delete(req, res, next) {
        throw new Error("Method not implemented.");
    }
}
exports.default = PublishedCourseListController;
