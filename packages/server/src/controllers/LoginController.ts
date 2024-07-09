import crypto from 'crypto';
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import jwt from 'jsonwebtoken';
import Admin from "../schemas/Admin";
import Student from "../schemas/Student";
import Teacher from "../schemas/Teacher";
import AuthController from "./AuthController";

class LoginController extends AuthController {
    get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
    async post(req: Request, res: Response<any, Record<string, any>>, next: NextFunction) {
        let user
        if (req.body.type === 'student') {
            user = await Student.findOne({
                username: req.body.username
            }).select('+password')
        } else if (req.body.type === 'teacher') {
            user = await Teacher.findOne({
                username: req.body.username
            }).select('+password')
        } else if (req.body.type === 'admin') {
            user = await Admin.findOne({
                username: req.body.username
            }).select('+password')
        }
        if (!user) {
            res.json({
                success: false,
                msg: '账号未注册'
            })
        } else {
            console.log('user is', user)
            const pwd = crypto.createHash('sha256').update(req.body.password).digest('hex')
            if (user && user.password === pwd) {
                const token = jwt.sign({
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    nickname: user.nickname,
                    type: req.body.type,
                }, 'helloworld', {algorithm: 'HS512', expiresIn: 60 * 60 * 8})
                res.json({
                    success: true,
                    token: token,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    nickname: user.nickname,
                    type: req.body.type,
                })
            } else {
                res.json({
                    success: false,
                    msg: '登录失败'
                })
            }
        }
    }
    put(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
  
}
export default LoginController