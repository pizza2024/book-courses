"use strict";
// import { forEach } from 'lodash';
// import pool from "./src/db/connection-pool";
// const dropTables = async () => {
//   const connection = await pool.getConnection()
//   try {
//     await connection.beginTransaction();
//     await connection.query(`drop database test`);
//     await connection.query(`create database test`);
//     await connection.commit();
//     await connection.release();
//   } catch (e) {
//     console.log('drop database error')
//     console.log(e)
//     connection.rollback();
//   }
// }
// const createTables = async () => {
//   const connection = await pool.getConnection()
//   try {
//     await connection.beginTransaction();
//     await connection.query('use test;')
//     await connection.query(`create table if not exists adminRole (
//       id int NOT NULL AUTO_INCREMENT,
//       name varchar(10) NOT NULL UNIQUE,
//       PRIMARY KEY (id)
//     )`)
//     await connection.query(`create table if not exists admin (
//       id int NOT NULL AUTO_INCREMENT,
//       username varchar(50) NOT NULL UNIQUE,
//       password varchar(256) NOT NULL,
//       email varchar(100) UNIQUE,
//       phone varchar(50),
//       nickname varchar(50),
//       adminRoleId int,
//       PRIMARY KEY (id),
//       FOREIGN KEY (adminRoleId) REFERENCES adminRole(id)
//     )`);
//     await connection.query(`create table if not exists teacher (
//       id int NOT NULL AUTO_INCREMENT,
//       username varchar(50) NOT NULL UNIQUE,
//       password varchar(256) NOT NULL,
//       email varchar(100) UNIQUE,
//       phone varchar(50),
//       nickname varchar(50),
//       adminId int,
//       PRIMARY KEY (id),
//       FOREIGN KEY (adminId) REFERENCES admin(id)
//     )`);
//     await connection.query(`create table if not exists student (
//       id int NOT NULL AUTO_INCREMENT,
//       username varchar(50) NOT NULL UNIQUE,
//       password varchar(256) NOT NULL,
//       email varchar(100) UNIQUE,
//       phone varchar(50),
//       nickname varchar(50),
//       adminId int,
//       signedCount int,
//       leaveCount int,
//       PRIMARY KEY (id),
//       FOREIGN KEY (adminId) REFERENCES admin(id)
//     )`);
//     await connection.query(`create table if not exists course (
//       id int NOT NULL AUTO_INCREMENT,
//       name varchar(50) NOT NULL UNIQUE,
//       adminId int,
//       PRIMARY KEY (id),
//       FOREIGN KEY (adminId) REFERENCES admin(id)
//     )`);
//     await connection.query(`create table if not exists publishedCourse (
//       id int NOT NULL AUTO_INCREMENT,
//       courseId int NOT NULL,
//       teacherId int NOT NULL,
//       classRoom varchar(50),
//       startTime DATETIME,
//       endTime DATETIME,
//       isOpen boolean,
//       canJoin boolean,
//       adminId int,
//       PRIMARY KEY (id),
//       FOREIGN KEY (adminId) REFERENCES admin(id),
//       FOREIGN KEY (courseId) REFERENCES course(id),
//       FOREIGN KEY (teacherId) REFERENCES teacher(id)
//     )`);
//     await connection.query(`create table if not exists bookedCourse (
//       courseId int NOT NULL,
//       teacherId int NOT NULL,
//       studentId int NOT NULL,
//       signIn boolean NOT NULL DEFAULT 0,
//       askLeave boolean NOT NULL DEFAULT 0,
//       adminId int,
//       PRIMARY KEY (courseId, teacherId, studentId),
//       FOREIGN KEY (adminId) REFERENCES admin(id),
//       FOREIGN KEY (courseId) REFERENCES course(id),
//       FOREIGN KEY (teacherId) REFERENCES teacher(id),
//       FOREIGN KEY (studentId) REFERENCES student(id)
//     )`);
//     await connection.commit();
//     await connection.release();
//   } catch (e) {
//     console.log('create table error')
//     console.log(e)
//     connection.rollback();
//   }
// }
// const insertDatas = async () => {
//   const dataMap = {
//     adminRole: [
//       {
//         name: 'super',
//       },
//       {
//         name: 'normal',
//       }
//     ],
//     admin: [
//       { username: 'admin1', password: mysql.raw('SHA2("123456", 256)'), adminRoleId: 1 },
//       { username: 'admin2', password: mysql.raw('SHA2("123456", 256)'), adminRoleId: 2 },
//       { username: 'admin3', password: mysql.raw('SHA2("123456", 256)'), adminRoleId: 2 }
//     ],
//     teacher: [
//       { username: 'teacher1', password: mysql.raw('SHA2("123456", 256)'), adminId: 1 },
//       { username: 'teacher2', password: mysql.raw('SHA2("123456", 256)'), adminId: 1 },
//       { username: 'teacher3', password: mysql.raw('SHA2("123456", 256)'), adminId: 2 },
//       { username: 'teacher4', password: mysql.raw('SHA2("123456", 256)'), adminId: 3 }
//     ],
//     student: [
//       { username: 'student1', password: mysql.raw('SHA2("123456", 256)'), adminId: 1 },
//       { username: 'student2', password: mysql.raw('SHA2("123456", 256)'), adminId: 1 },
//       { username: 'student3', password: mysql.raw('SHA2("123456", 256)'), adminId: 2 },
//       { username: 'student4', password: mysql.raw('SHA2("123456", 256)'), adminId: 3 },
//       { username: 'student5', password: mysql.raw('SHA2("123456", 256)'), adminId: 3 }
//     ],
//     course: [
//       { name: '音乐', adminId: 1 },
//       { name: '美术', adminId: 1 },
//       { name: '数学', adminId: 1 },
//       { name: '体育', adminId: 1 },
//       { name: '语文', adminId: 1 },
//       { name: '英语', adminId: 1 },
//       { name: '化学', adminId: 1 },
//       { name: '政治', adminId: 1 },
//       { name: '物理', adminId: 1 },
//       { name: '自习', adminId: 1 },
//     ],
//     publishedCourse: [
//       {
//         courseId: 1,
//         teacherId: 1,
//         classRoom: 'classRoom1',
//         startTime: new Date('2024-06-01 08:00:00'),
//         endTime: new Date('2024-06-01 08:45:00'),
//         isOpen: true,
//         canJoin: true,
//         adminId: 1
//       },
//       {
//         courseId: 1,
//         teacherId: 1,
//         classRoom: 'classRoom1',
//         startTime: new Date('2024-06-01 18:00:00'),
//         endTime: new Date('2024-06-01 20:45:00'),
//         isOpen: true,
//         canJoin: true,
//         adminId: 1
//       },
//       {
//         courseId: 1,
//         teacherId: 2,
//         classRoom: 'classRoom1',
//         startTime: new Date('2024-06-02 08:00:00'),
//         endTime: new Date('2024-06-02 08:45:00'),
//         isOpen: true,
//         canJoin: true,
//         adminId: 1
//       },
//       {
//         courseId: 2,
//         teacherId: 1,
//         classRoom: 'classRoom2',
//         startTime: new Date('2024-06-03 14:00:00'),
//         endTime: new Date('2024-06-03 15:45:00'),
//         isOpen: true,
//         canJoin: true,
//         adminId: 1
//       },
//       {
//         courseId: 3,
//         teacherId: 2,
//         classRoom: 'classRoom3',
//         startTime: new Date('2024-06-08 18:00:00'),
//         endTime: new Date('2024-06-08 20:45:00'),
//         isOpen: true,
//         canJoin: true,
//         adminId: 1
//       },
//       {
//         courseId: 4,
//         teacherId: 3,
//         classRoom: 'classRoom4',
//         startTime: new Date('2024-06-18 18:00:00'),
//         endTime: new Date('2024-06-20 07:45:00'),
//         isOpen: true,
//         canJoin: true,
//         adminId: 1
//       }
//     ],
//     bookedCourse: [
//       {
//         courseId: 1,
//         teacherId: 1,
//         studentId: 1,
//         signIn: false,
//         askLeave: false,
//         adminId: 1
//       },
//       {
//         courseId: 3,
//         teacherId: 2,
//         studentId: 1,
//         signIn: false,
//         askLeave: false,
//         adminId: 1
//       },
//       {
//         courseId: 3,
//         teacherId: 2,
//         studentId: 3,
//         signIn: false,
//         askLeave: false,
//         adminId: 1
//       },
//       {
//         courseId: 4,
//         teacherId: 3,
//         studentId: 1,
//         signIn: false,
//         askLeave: false,
//         adminId: 1
//       },
//       {
//         courseId: 4,
//         teacherId: 3,
//         studentId: 5,
//         signIn: false,
//         askLeave: false,
//         adminId: 1
//       },
//       {
//         courseId: 4,
//         teacherId: 3,
//         studentId: 3,
//         signIn: false,
//         askLeave: false,
//         adminId: 1
//       },
//     ]
//   }
//   const connection = await pool.getConnection();
//   await connection.beginTransaction();
//   try {
//     forEach(dataMap, async (rows, tableName) => {
//       forEach(rows, async (row) => {
//         await connection.query(`insert into ${tableName} set ?`, row);
//       })
//     })
//     await connection.commit();
//     await connection.release();
//   } catch (e) {
//     console.log('insert table error')
//     console.log(e)
//     await connection.rollback();
//   }
// }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const lodash_1 = require("lodash");
const connection_mongo_1 = __importDefault(require("./src/db/connection-mongo"));
const Admin_1 = __importDefault(require("./src/schemas/Admin"));
const Course_1 = __importDefault(require("./src/schemas/Course"));
const PublishedCourse_1 = __importDefault(require("./src/schemas/PublishedCourse"));
const Student_1 = __importDefault(require("./src/schemas/Student"));
const Teacher_1 = __importDefault(require("./src/schemas/Teacher"));
// const main = async () => {
//   await dropTables();
//   await createTables();
//   await insertDatas();
//   console.log('done.')
//   process.exit();
// }
// main()
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_mongo_1.default)();
        yield initAdmin();
        yield initStudent();
        yield initTeacher();
        yield initCourse();
        yield initPublishedCourse();
        process.exit(0);
    });
}
try {
    main();
}
catch (e) {
    console.log(e);
    process.exit(1);
}
function initAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Admin_1.default.collection.drop();
        const admins = new Array(10).fill(1).map((x, index) => {
            const admin = new Admin_1.default({
                username: `admin${index + 1}`,
                nickname: `管理员${index + 1}`,
                adminRole: 'admin',
                createdAt: new Date(),
                password: (0, crypto_1.createHash)('sha256').update('123456').digest('hex'),
            });
            return admin;
        });
        yield Admin_1.default.insertMany(admins);
    });
}
function initStudent() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Student_1.default.collection.drop();
        const students = new Array(10).fill(1).map((x, index) => {
            const student = new Student_1.default({
                username: `student${index + 1}`,
                nickname: `学生${index + 1}`,
                createdAt: new Date(),
                password: (0, crypto_1.createHash)('sha256').update('123456').digest('hex'),
            });
            return student;
        });
        yield Student_1.default.insertMany(students);
    });
}
function initTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Teacher_1.default.collection.drop();
        const teachers = new Array(10).fill(1).map((x, index) => {
            const teacher = new Teacher_1.default({
                username: `teacher${index + 1}`,
                nickname: `老师${index + 1}`,
                createdAt: new Date(),
                password: (0, crypto_1.createHash)('sha256').update('123456').digest('hex'),
            });
            return teacher;
        });
        yield Teacher_1.default.insertMany(teachers);
    });
}
function initCourse() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Course_1.default.collection.drop();
        const admins = yield Admin_1.default.find({});
        const courses = (0, lodash_1.map)(new Array(10).fill(1), (x, index) => {
            const course = new Course_1.default({
                name: `course${index + 1}`,
                admin: admins[index],
                createdAt: Date.now()
            });
            return course;
        });
        yield Course_1.default.insertMany(courses);
        const results = yield Course_1.default.find({}).populate('admin');
        console.log('results is:', results);
    });
}
function initPublishedCourse() {
    return __awaiter(this, void 0, void 0, function* () {
        yield PublishedCourse_1.default.collection.drop();
        const admins = yield Admin_1.default.find({});
        const teachers = yield Teacher_1.default.find({});
        const courses = yield Course_1.default.find({});
        const list = (0, lodash_1.map)(new Array(10).fill(1), (x, index) => {
            const publishedCourse = new PublishedCourse_1.default({
                location: `location${index + 1}`,
                startTime: new Date(),
                endTime: new Date(),
                createdAt: new Date(),
                teacher: teachers[index],
                course: courses[index],
                admin: admins[index]
            });
            return publishedCourse;
        });
        yield PublishedCourse_1.default.insertMany(list);
        const results = yield PublishedCourse_1.default.find({})
            .populate('admin', '-username -createdAt -adminRole')
            .populate('teacher', '-username -createdAt')
            .populate('course', '-createdAt -admin');
        console.log('results is:', results);
    });
}
