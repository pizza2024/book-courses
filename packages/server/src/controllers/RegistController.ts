import { createHash } from "crypto";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import Admin from "../schemas/Admin";
import Student from "../schemas/Student";
import Teacher from "../schemas/Teacher";
import AuthController from "./AuthController";

export default class RegistController extends AuthController {
  get(req: Request, res: Response, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  async post(req: Request, res: Response, next: NextFunction) {
    let user
    if (req.body.type === 'student') {
        user = await Student.findOne({
            username: req.body.username
        })
    } else if (req.body.type === 'teacher') {
        user = await Teacher.findOne({
            username: req.body.username
        })
    } else if (req.body.type === 'admin') {
        user = await Admin.findOne({
            username: req.body.username
        })
    }
    if (user) {
      res.json({
        success: false,
        msg: '已注册'
      })
      return;
    }
    try {
      const pwd = createHash('sha256').update(req.body.password).digest('hex')
      const user = req.body.type === 'student' ? new Student() :
        req.body.type === 'teacher' ? new Teacher() :
        req.body.type === 'admin' ? new Admin() :
        new Student();
      user.username = req.body.username;
      user.password = pwd;
      const result = await user.save()
      res.json({
        success: true,
        msg: `${result.username}注册成功!`
      })
      return;
    } catch (e) {
      res.json(e)
      return;
    }
  }
  put(req: Request, res: Response, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
}