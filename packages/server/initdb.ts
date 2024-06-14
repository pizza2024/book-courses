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
      room varchar(256) NOT NULL,
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
      studentCount int,
      studentLimit int,
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
  const admins = [
    { username: 'admin1', password: mysql.raw('SHA2("123456", 256)'), adminRoleId: 1 },
    { username: 'admin2', password: mysql.raw('SHA2("123456", 256)'), adminRoleId: 2 },
    { username: 'admin3', password: mysql.raw('SHA2("123456", 256)'), adminRoleId: 2 }
  ]
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    await connection.query(`insert into adminRole values (null, 'super'), (null, 'normal')`)
    for (let admin of admins) {
      await connection.query(`insert into admin set ?`, admin);
    }
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