import { forEach } from 'lodash';
import moment from 'moment';
import mysql from 'mysql2';
import pool from "./src/db/connection-pool";
const dropTables = async () => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction();
    await connection.query(`drop database test`);
    await connection.query(`create database test`);
    await connection.commit();
    await connection.release();
  } catch (e) {
    console.log('drop database error')
    console.log(e)
    connection.rollback();
  }
}
const createTables = async () => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction();
    await connection.query('use test;')
    await connection.query(`create table if not exists adminRole (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(10) NOT NULL UNIQUE,
      PRIMARY KEY (id)
    )`)
    await connection.query(`create table if not exists admin (
      id int NOT NULL AUTO_INCREMENT,
      username varchar(50) NOT NULL UNIQUE,
      password varchar(256) NOT NULL,
      email varchar(100) UNIQUE,
      phone varchar(50),
      nickname varchar(50),
      adminRoleId int,
      PRIMARY KEY (id),
      FOREIGN KEY (adminRoleId) REFERENCES admin(id)
    )`);
    await connection.query(`create table if not exists teacher (
      id int NOT NULL AUTO_INCREMENT,
      username varchar(50) NOT NULL UNIQUE,
      password varchar(256) NOT NULL,
      email varchar(100) UNIQUE,
      phone varchar(50),
      nickname varchar(50),
      adminId int,
      PRIMARY KEY (id),
      FOREIGN KEY (adminId) REFERENCES admin(id)
    )`);
    await connection.query(`create table if not exists student (
      id int NOT NULL AUTO_INCREMENT,
      username varchar(50) NOT NULL UNIQUE,
      password varchar(256) NOT NULL,
      email varchar(100) UNIQUE,
      phone varchar(50),
      nickname varchar(50),
      adminId int,
      signedCount int,
      leaveCount int,
      PRIMARY KEY (id),
      FOREIGN KEY (adminId) REFERENCES admin(id)
    )`);
    await connection.query(`create table if not exists course (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(50) NOT NULL UNIQUE,
      adminId int,
      PRIMARY KEY (id),
      FOREIGN KEY (adminId) REFERENCES admin(id)
    )`);
    await connection.query(`create table if not exists publishedCourse (
      courseId int NOT NULL,
      teacherId int NOT NULL,
      classRoom varchar(50),
      daytime json,
      launchTime date,
      removeTime date,
      repeatDay varchar(7),
      isOpen boolean,
      canJoin boolean,
      adminId int,
      PRIMARY KEY (courseId, teacherId),
      FOREIGN KEY (adminId) REFERENCES admin(id),
      FOREIGN KEY (courseId) REFERENCES course(id),
      FOREIGN KEY (teacherId) REFERENCES teacher(id)
    )`);
    await connection.query(`create table if not exists bookedCourse (
      courseId int NOT NULL,
      teacherId int NOT NULL,
      studentId int NOT NULL,
      signIn boolean NOT NULL DEFAULT 0,
      askLeave boolean NOT NULL DEFAULT 0,
      adminId int,
      PRIMARY KEY (courseId, teacherId, studentId),
      FOREIGN KEY (adminId) REFERENCES admin(id),
      FOREIGN KEY (courseId) REFERENCES course(id),
      FOREIGN KEY (teacherId) REFERENCES teacher(id),
      FOREIGN KEY (studentId) REFERENCES student(id)
    )`);
    await connection.commit();
    await connection.release();
  } catch (e) {
    console.log('create table error')
    console.log(e)
    connection.rollback();
  }
}
const insertDatas = async () => {
  const dataMap = {
    adminRole: [
      {
        name: 'super',
      },
      {
        name: 'normal',
      }
    ],
    admin: [
      { username: 'admin1', password: mysql.raw('SHA2("123456", 256)'), adminRoleId: 1 },
      { username: 'admin2', password: mysql.raw('SHA2("123456", 256)'), adminRoleId: 2 },
      { username: 'admin3', password: mysql.raw('SHA2("123456", 256)'), adminRoleId: 2 }
    ],
    teacher: [
      { username: 'teacher1', password: mysql.raw('SHA2("123456", 256)'), adminId: 1 },
      { username: 'teacher2', password: mysql.raw('SHA2("123456", 256)'), adminId: 1 },
      { username: 'teacher3', password: mysql.raw('SHA2("123456", 256)'), adminId: 2 },
      { username: 'teacher4', password: mysql.raw('SHA2("123456", 256)'), adminId: 3 }
    ],
    student: [
      { username: 'student1', password: mysql.raw('SHA2("123456", 256)'), adminId: 1 },
      { username: 'student2', password: mysql.raw('SHA2("123456", 256)'), adminId: 1 },
      { username: 'student3', password: mysql.raw('SHA2("123456", 256)'), adminId: 2 },
      { username: 'student4', password: mysql.raw('SHA2("123456", 256)'), adminId: 3 },
      { username: 'student5', password: mysql.raw('SHA2("123456", 256)'), adminId: 3 }
    ],
    course: [
      { name: '音乐', adminId: 1 },
      { name: '美术', adminId: 1 },
      { name: '数学', adminId: 1 },
      { name: '体育', adminId: 1 },
      { name: '语文', adminId: 1 },
      { name: '英语', adminId: 1 },
      { name: '化学', adminId: 1 },
      { name: '政治', adminId: 1 },
      { name: '物理', adminId: 1 },
      { name: '自习', adminId: 1 },
    ],
    publishedCourse: [
      {
        courseId: 1,
        teacherId: 1,
        classRoom: 'classRoom1',
        daytime: JSON.stringify([
          { startTime: '08:00:00', endTime: '08:45:00' },
          { startTime: '18:00:00', endTime: '18:45:00' }
        ]),
        launchTime: moment(new Date('2024-03-01')).format('YYYY-MM-DD HH:mm:ss'),
        removeTime: moment(new Date('2024-08-01')).format('YYYY-MM-DD HH:mm:ss'),
        repeatDay: '1111100',
        isOpen: true,
        canJoin: true,
        adminId: 1
      },
      {
        courseId: 1,
        teacherId: 2,
        classRoom: 'classRoom1',
        daytime: JSON.stringify([
          { startTime: '08:00:00', endTime: '08:45:00' },
          { startTime: '18:00:00', endTime: '18:45:00' }
        ]),
        launchTime: moment(new Date('2024-03-01')).format('YYYY-MM-DD HH:mm:ss'),
        removeTime: moment(new Date('2024-08-01')).format('YYYY-MM-DD HH:mm:ss'),
        repeatDay: '1111100',
        isOpen: true,
        canJoin: true,
        adminId: 1
      },
      {
        courseId: 2,
        teacherId: 1,
        classRoom: 'classRoom2',
        daytime: JSON.stringify([
          { startTime: '08:00:00', endTime: '08:45:00' },
          { startTime: '18:00:00', endTime: '18:45:00' }
        ]),
        launchTime: moment(new Date('2024-03-01')).format('YYYY-MM-DD HH:mm:ss'),
        removeTime: moment(new Date('2024-08-01')).format('YYYY-MM-DD HH:mm:ss'),
        repeatDay: '1111100',
        isOpen: true,
        canJoin: true,
        adminId: 1
      },
      {
        courseId: 3,
        teacherId: 2,
        classRoom: 'classRoom3',
        daytime: JSON.stringify([
          { startTime: '08:00:00', endTime: '08:45:00' },
          { startTime: '18:00:00', endTime: '18:45:00' }
        ]),
        launchTime: moment(new Date('2024-03-01')).format('YYYY-MM-DD HH:mm:ss'),
        removeTime: moment(new Date('2024-08-01')).format('YYYY-MM-DD HH:mm:ss'),
        repeatDay: '1111100',
        isOpen: true,
        canJoin: true,
        adminId: 1
      },
      {
        courseId: 4,
        teacherId: 3,
        classRoom: 'classRoom4',
        daytime: JSON.stringify([
          { startTime: '08:00:00', endTime: '08:45:00' },
          { startTime: '18:00:00', endTime: '18:45:00' }
        ]),
        launchTime: moment(new Date('2024-03-01')).format('YYYY-MM-DD HH:mm:ss'),
        removeTime: moment(new Date('2024-08-01')).format('YYYY-MM-DD HH:mm:ss'),
        repeatDay: '1111100',
        isOpen: true,
        canJoin: true,
        adminId: 1
      }
    ],
    bookedCourse: [
      {
        courseId: 1,
        teacherId: 1,
        studentId: 1,
        signIn: false,
        askLeave: false,
        adminId: 1
      },
      {
        courseId: 3,
        teacherId: 2,
        studentId: 1,
        signIn: false,
        askLeave: false,
        adminId: 1
      },
      {
        courseId: 3,
        teacherId: 2,
        studentId: 3,
        signIn: false,
        askLeave: false,
        adminId: 1
      },
      {
        courseId: 4,
        teacherId: 3,
        studentId: 1,
        signIn: false,
        askLeave: false,
        adminId: 1
      },
      {
        courseId: 4,
        teacherId: 3,
        studentId: 5,
        signIn: false,
        askLeave: false,
        adminId: 1
      },
      {
        courseId: 4,
        teacherId: 3,
        studentId: 3,
        signIn: false,
        askLeave: false,
        adminId: 1
      },
    ]
  }
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    forEach(dataMap, async (rows, tableName) => {
      forEach(rows, async (row) => {
        await connection.query(`insert into ${tableName} set ?`, row);
      })
    })
    await connection.commit();
    await connection.release();
  } catch (e) {
    console.log('insert table error')
    console.log(e)
    await connection.rollback();
  }
}

const main = async () => {
  await dropTables();
  await createTables();
  await insertDatas();
  console.log('done.')
  process.exit();
}

main()