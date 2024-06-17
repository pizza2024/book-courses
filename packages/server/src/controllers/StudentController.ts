import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { get, isArray } from "lodash";
import { queryPostStudent } from "../db";
import AuthController from "./AuthController";

class StudentController extends AuthController {
  get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  post(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    console.log(req.body)
    console.log(req.auth)
    if (req.auth?.type !== 'admin') {
      res.json({
        success: false,
        msg: 'admin 才可以添加学生信息'
      })
    } else {
      const adminId = req.auth?.id;
      if (!adminId) {
        res.json({
          success: false,
          msg: "缺少admin id"
        })
      } else {
        queryPostStudent({
          ...req.body,
          adminId: req.auth?.id
        }).then(result => {
          if (isArray(result) && get(result, '0.affectedRows') === 1) {
            res.json({
              success: true,
              student: req.body,
              adminId: req.auth?.id
            })
          } else {
            res.json({
              success: false,
              msg: get(result, 'message')
            })
          }
        }).catch(e => {
          res.json({
            success: false,
            msg: e.toString()
          })
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
export default StudentController