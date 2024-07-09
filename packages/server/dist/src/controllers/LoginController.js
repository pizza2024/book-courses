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
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../schemas/Admin"));
const Student_1 = __importDefault(require("../schemas/Student"));
const Teacher_1 = __importDefault(require("../schemas/Teacher"));
const AuthController_1 = __importDefault(require("./AuthController"));
class LoginController extends AuthController_1.default {
    get(req, res, next) {
        throw new Error("Method not implemented.");
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (req.body.type === 'student') {
                user = yield Student_1.default.findOne({
                    username: req.body.username
                }).select('+password');
            }
            else if (req.body.type === 'teacher') {
                user = yield Teacher_1.default.findOne({
                    username: req.body.username
                }).select('+password');
            }
            else if (req.body.type === 'admin') {
                user = yield Admin_1.default.findOne({
                    username: req.body.username
                }).select('+password');
            }
            if (!user) {
                res.json({
                    success: false,
                    msg: '账号未注册'
                });
            }
            else {
                console.log('user is', user);
                const pwd = crypto_1.default.createHash('sha256').update(req.body.password).digest('hex');
                if (user && user.password === pwd) {
                    const token = jsonwebtoken_1.default.sign({
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        nickname: user.nickname,
                        type: req.body.type,
                    }, 'helloworld', { algorithm: 'HS512', expiresIn: 60 * 60 * 8 });
                    res.json({
                        success: true,
                        token: token,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        nickname: user.nickname,
                        type: req.body.type,
                    });
                }
                else {
                    res.json({
                        success: false,
                        msg: '登录失败'
                    });
                }
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
exports.default = LoginController;
