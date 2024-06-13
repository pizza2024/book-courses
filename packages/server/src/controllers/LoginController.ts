import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import jwt from 'jsonwebtoken';
import AuthController from "./AuthController";

class LoginController extends AuthController {
    get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
    post(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
        const data = req.body;
        if (data.username === 'admin' && data.password === '123') {
            const token = jwt.sign({
                username: data.username
            }, 'helloworld', {algorithm: 'HS512', expiresIn: 60 * 60 * 8})
            res.json({
                success: true,
                token: token,
            })
        } else {
            res.json({
                success: false,
                msg: '登录失败'
            })
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