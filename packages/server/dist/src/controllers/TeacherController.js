"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("./AuthController"));
class TeacherController extends AuthController_1.default {
    get(req, res, next) {
        throw new Error("Method not implemented.");
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
exports.default = TeacherController;
