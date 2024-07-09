"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminListController_1 = __importDefault(require("../controllers/AdminListController"));
const CourseController_1 = __importDefault(require("../controllers/CourseController"));
const CourseListController_1 = __importDefault(require("../controllers/CourseListController"));
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const PublishedCourseListController_1 = __importDefault(require("../controllers/PublishedCourseListController"));
const RegistController_1 = __importDefault(require("../controllers/RegistController"));
const StudentController_1 = __importDefault(require("../controllers/StudentController"));
const StudentListController_1 = __importDefault(require("../controllers/StudentListController"));
const TeacherController_1 = __importDefault(require("../controllers/TeacherController"));
const TeacherListController_1 = __importDefault(require("../controllers/TeacherListController"));
const Route_1 = __importDefault(require("./Route"));
const onlyAdmin = (types) => [(req, res, next) => {
        var _a;
        if (types.includes((_a = req.auth) === null || _a === void 0 ? void 0 : _a.type)) {
            next();
        }
        else {
            res.json({
                success: false,
                msg: 'user is not admin'
            });
        }
    }];
const routes = [
    new Route_1.default('/api/login', new LoginController_1.default()),
    new Route_1.default('/api/regist', new RegistController_1.default()),
    new Route_1.default('/api/adminlist', new AdminListController_1.default(), onlyAdmin(["admin"])),
    new Route_1.default('/api/teacher', new TeacherController_1.default(), onlyAdmin(['admin'])),
    new Route_1.default('/api/teacherlist', new TeacherListController_1.default(), onlyAdmin(['admin'])),
    new Route_1.default('/api/student', new StudentController_1.default(), onlyAdmin(['admin'])),
    new Route_1.default('/api/studentlist', new StudentListController_1.default(), onlyAdmin(['admin'])),
    new Route_1.default('/api/course', new CourseController_1.default(), onlyAdmin(['admin'])),
    new Route_1.default('/api/courselist', new CourseListController_1.default(), onlyAdmin(['admin'])),
    new Route_1.default('/api/publishedCourseList', new PublishedCourseListController_1.default())
];
exports.default = routes;
