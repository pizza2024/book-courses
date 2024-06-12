import { NextFunction, Response } from "express";
import { Request } from "express-jwt";

abstract class AuthController {
  constructor() {
  }
  abstract get(req: Request, res: Response, next: NextFunction): void;
  abstract post(req: Request, res: Response, next: NextFunction): void;
  abstract put(req: Request, res: Response, next: NextFunction): void;
  abstract delete(req: Request, res: Response, next: NextFunction): void;
}
export default AuthController