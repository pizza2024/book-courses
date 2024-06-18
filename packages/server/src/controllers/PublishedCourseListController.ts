import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { insertPublishedCourses, queryPublishedCourse } from "../db";
import AuthController from "./AuthController";

class PublishedCourseListController extends AuthController {
  get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    queryPublishedCourse().then(rows => {
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
    console.log(req.body)
    insertPublishedCourses(req.body.courses).then(result => {
      res.json({
        success: true,
        result
      })
    }).catch(e => {
      res.json({
        success: false, msg: e.toString()
      })
    })
    
  }
  put(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
}
export default PublishedCourseListController