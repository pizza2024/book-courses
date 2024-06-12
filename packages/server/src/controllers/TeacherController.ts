import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import AuthController from "./AuthController";

class TeacherController extends AuthController {
  get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    res.json({
        success: true,
        msg: 'get teacher'
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
export default TeacherController