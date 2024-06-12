import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import AuthController from "./AuthController";

class UserController extends AuthController {
  get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    throw new Error("Method not implemented.");
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
export default UserController