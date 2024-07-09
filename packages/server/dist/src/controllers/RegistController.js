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
const crypto_1 = require("crypto");
const Admin_1 = __importDefault(require("../schemas/Admin"));
const Student_1 = __importDefault(require("../schemas/Student"));
const Teacher_1 = __importDefault(require("../schemas/Teacher"));
const AuthController_1 = __importDefault(require("./AuthController"));
class RegistController extends AuthController_1.default {
    get(req, res, next) {
        throw new Error("Method not implemented.");
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (req.body.type === 'student') {
                user = yield Student_1.default.findOne({
                    username: req.body.username
                });
            }
            else if (req.body.type === 'teacher') {
                user = yield Teacher_1.default.findOne({
                    username: req.body.username
                });
            }
            else if (req.body.type === 'admin') {
                user = yield Admin_1.default.findOne({
                    username: req.body.username
                });
            }
            if (user) {
                res.json({
                    success: false,
                    msg: '已注册'
                });
                return;
            }
            try {
                const pwd = (0, crypto_1.createHash)('sha256').update(req.body.password).digest('hex');
                const user = req.body.type === 'student' ? new Student_1.default() :
                    req.body.type === 'teacher' ? new Teacher_1.default() :
                        req.body.type === 'admin' ? new Admin_1.default() :
                            new Student_1.default();
                user.username = req.body.username;
                user.password = pwd;
                const result = yield user.save();
                res.json({
                    success: true,
                    msg: `${result.username}注册成功!`
                });
                return;
            }
            catch (e) {
                res.json(e);
                return;
            }
        });
    }
    put(req, res, next) {
        throw new Error("Method not implemented.");
    }
    delete(req, res, next) {
        throw new Error("Method not implemented.");
    }
}
exports.default = RegistController;
