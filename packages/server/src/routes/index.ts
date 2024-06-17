import { NextFunction, Response } from 'express';
import { Request } from "express-jwt";
import AdminListController from "../controllers/AdminListController";
import CourseListController from "../controllers/CourseListController";
import LoginController from "../controllers/LoginController";
import PublishedCourseListController from "../controllers/PublishedCourseListController";
import StudentController from '../controllers/StudentController';
import StudentListController from "../controllers/StudentListController";
import TeacherController from "../controllers/TeacherController";
import TeacherListController from '../controllers/TeacherListController';
import Route from "./Route";
const onlyAdmin = (types: ('admin' | 'teacher' | 'student')[]) => [(req: Request, res:Response, next:NextFunction) => {
    if (types.includes(req.auth?.type)) {
        next()
    } else {
        res.json({
            success: false,
            msg: 'user is not admin'
        })
    }
}]
const routes = [
    new Route('/api/login', new LoginController()),
    new Route('/api/adminlist', new AdminListController(), onlyAdmin(["admin"])),
    new Route('/api/teacher', new TeacherController(), onlyAdmin(['admin'])),
    new Route('/api/teacherlist', new TeacherListController(), onlyAdmin(['admin'])),
    new Route('/api/student', new StudentController(), onlyAdmin(['admin'])),
    new Route('/api/studentlist', new StudentListController(), onlyAdmin(['admin'])),
    new Route('/api/courselist', new CourseListController()),
    new Route('/api/publishedCourseList', new PublishedCourseListController())
]

export default routes