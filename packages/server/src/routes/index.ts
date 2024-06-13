import LoginController from "../controllers/LoginController";
import TeacherController from "../controllers/TeacherController";
import UserController from "../controllers/UserController";
import Route from "./Route";

const routes = [
    new Route('/api/user', new UserController()),
    new Route('/api/teacher', new TeacherController()),
    new Route('/api/login', new LoginController())
]

export default routes