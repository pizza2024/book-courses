import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { get, isArray } from "lodash";
import { queryPostTeacher, queryTeachersByName } from "../db";
import AuthController from "./AuthController";

class TeacherController extends AuthController {
  get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    queryTeachersByName(req.query.teacherName as string).then(result => {
      if (isArray(result)) {
        res.json({
          success: true,
          teachers: result
        })
      } else {
        res.json({
          success: false,
          teachers: []
        })
      }
    }).catch(e => {
      res.json({
        success: false,
        msg: e.toString()
      })
    })
  }
  post(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    const adminId = req.auth?.id;
      if (!adminId) {
        res.json({
          success: false,
          msg: "缺少admin id"
        })
      } else {
        queryPostTeacher({
          ...req.body,
          adminId: req.auth?.id
        }).then(result => {
          if (isArray(result) && get(result, '0.affectedRows') === 1) {
            res.json({
              success: true,
              teacher: req.body,
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
  put(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
}
export default TeacherController