import { LoginData, User } from "common";
import crypto from 'crypto';
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import jwt from 'jsonwebtoken';
import { get, omit } from "lodash";
import { queryAdminByUsername, queryStudentByUsername, queryTeacherByUsername } from "../db";
import AuthController from "./AuthController";

class LoginController extends AuthController {
    get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
    post(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
        const data: LoginData = req.body;
        const method = data.type === 'student' ? queryStudentByUsername : data.type === 'teacher' ? queryTeacherByUsername : data.type === 'admin' ? queryAdminByUsername : () => Promise.resolve({
            success: false,
            msg: 'unknow login type'
        })
        method(data.username).then(result => {
            const user: User & {password: string} = get(result, 0)
            if (!user) {
                res.json({
                    success: false,
                    msg: '账号未注册'
                })
            } else {
                const pwd = crypto.createHash('sha256').update(data.password).digest('hex')
                if (user.password === pwd) {
                    const token = jwt.sign({
                        ...omit(user, 'password'),
                        type: data.type,
                    }, 'helloworld', {algorithm: 'HS512', expiresIn: 60 * 60 * 8})
                    res.json({
                        success: true,
                        token: token,
                        ...omit(user, 'password'),
                        type: data.type,
                    })
                } else {
                    res.json({
                        success: false,
                        msg: '登录失败'
                    })
                }
            }
        })
        // if (data.type === 'student') {
        //     queryStudentByUsername(data.username)
        // } else if (data.type === 'admin') {
        //     queryAdminByUsername(data.username).then(result => {
        //         const admin: (ModalAdmin) & {password: string} = get(result, 0)
        //         if (!admin) {
        //             res.json({
        //                 success: false,
        //                 msg: '账号未注册'
        //             })
        //         } else {
        //             const pwd = crypto.createHash('sha256').update(data.password).digest('hex')
        //             if (admin.password === pwd) {
        //                 const token = jwt.sign({
        //                     ...omit(admin, 'password')
        //                 }, 'helloworld', {algorithm: 'HS512', expiresIn: 60 * 60 * 8})
        //                 res.json({
        //                     success: true,
        //                     token: token,
        //                     ...omit(admin, 'password')
        //                 })
        //             } else {
        //                 res.json({
        //                     success: false,
        //                     msg: '登录失败'
        //                 })
        //             }
        //         }
        //     })
        // } else if (data.type === 'teacher') {
        //     queryTeacherByUsername(data.username).then(result => {
        //         const teacher: (ModalTeacher) & {password: string} = get(result, 0)
        //         if (!teacher) {
        //             res.json({
        //                 success: false,
        //                 msg: '账号未注册'
        //             })
        //         } else {
        //             const pwd = crypto.createHash('sha256').update(data.password).digest('hex')
        //             if (teacher.password === pwd) {
        //                 const token = jwt.sign({
        //                     ...omit(teacher, 'password')
        //                 }, 'helloworld', {algorithm: 'HS512', expiresIn: 60 * 60 * 8})
        //                 res.json({
        //                     success: true,
        //                     token: token,
        //                     ...omit(teacher, 'password')
        //                 })
        //             } else {
        //                 res.json({
        //                     success: false,
        //                     msg: '登录失败'
        //                 })
        //             }
        //         }
        //     })
        // } else {
        //     res.json({
        //         success: false,
        //         msg: 'unknow login type'
        //     })
        // }
        // if (data.username === 'admin' && data.password === '123') {
        //     const token = jwt.sign({
        //         username: data.username
        //     }, 'helloworld', {algorithm: 'HS512', expiresIn: 60 * 60 * 8})
        //     res.json({
        //         success: true,
        //         token: token,
        //     })
        // } else {
        //     res.json({
        //         success: false,
        //         msg: '登录失败'
        //     })
        // }
    }
    put(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
  
}
export default LoginController