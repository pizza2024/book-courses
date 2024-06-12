import LoginController from "../controllers/LoginController";
import TeacherController from "../controllers/TeacherController";
import UserController from "../controllers/UserController";
import Route from "./Route";

const routes = [
    new Route('/user', new UserController()),
    new Route('/teacher', new TeacherController()),
    new Route('/login', new LoginController())
]

export default routes