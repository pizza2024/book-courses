import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import PublishedCourse from "../schemas/PublishedCourse";
import AuthController from "./AuthController";

class PublishedCourseListController extends AuthController {
  async get(req: Request, res: Response, next: NextFunction) {
    const rows = await PublishedCourse.find({})
      .populate('admin', '-username -createdAt -adminRole')
      .populate('teacher', '-username -createdAt')
      .populate('course', 'name');
      
    res.json({
      success: true,
      rows
    })
  }
  post(req: Request, res: Response, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  put(req: Request, res: Response, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
  // get(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
  //   queryPublishedCourse().then(rows => {
  //     res.json({
  //       success: true,
  //       rows
  //     })
  //   }).catch(e => {
  //     res.json({
  //       success: false,
  //       msg: e.toString()
  //     })
  //   })
  // }
  // post(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
  //   console.log(req.body)
  //   insertPublishedCourses(req.body.courses).then(result => {
  //     res.json({
  //       success: true,
  //       result
  //     })
  //   }).catch(e => {
  //     res.json({
  //       success: false, msg: e.toString()
  //     })
  //   })
    
  // }
  // put(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
  //   throw new Error("Method not implemented.");
  // }
  // delete(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
  //   throw new Error("Method not implemented.");
  // }
}
export default PublishedCourseListController