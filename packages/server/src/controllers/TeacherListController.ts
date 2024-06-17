import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { queryTeacher } from "../db";
import AuthController from "./AuthController";

class TeacherListController extends AuthController {
  get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    queryTeacher().then(rows => {
      res.json({
        success: true,
        rows
      })
    }).catch(e => {
      res.json({
        success: false,
        msg: e.toString()
      })
    })
  }
  post(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  put(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
}
export default TeacherListController