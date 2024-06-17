import AdminListController from "../controllers/AdminListController";
import CourseListController from "../controllers/CourseListController";
import LoginController from "../controllers/LoginController";
import PublishedCourseListController from "../controllers/PublishedCourseListController";
import StudentListController from "../controllers/StudentListController";
import TeacherController from "../controllers/TeacherController";
import Route from "./Route";

const routes = [
    new Route('/api/login', new LoginController()),
    new Route('/api/adminlist', new AdminListController()),
    new Route('/api/teacherlist', new TeacherController()),
    new Route('/api/studentlist', new StudentListController()),
    new Route('/api/courselist', new CourseListController()),
    new Route('/api/publishedCourseList', new PublishedCourseListController())
]

export default routes