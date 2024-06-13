import Mock from 'mockjs';
import mysql from 'mysql2/promise';
import pool from "./src/db/connection-pool";
const dropTables = async () => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction();
    await connection.query(`drop table users`);
    await connection.query(`drop table role`);
    await connection.commit();
    await connection.release();
  } catch (e) {
    console.log('drop table error')
    console.log(e)
    connection.rollback();
  }
}
const createTables = async () => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction();
    await connection.query(`create table if not exists role (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(10) NOT NULL UNIQUE,
      PRIMARY KEY (id)
    )`)
    await connection.query(`create table if not exists users (
      id int NOT NULL AUTO_INCREMENT,
      username varchar(50) NOT NULL UNIQUE,
      email varchar(100) NOT NULL UNIQUE,
      password varchar(256) NOT NULL,
      birthdate date,
      is_active boolean default true,
      role_id int default null,
      PRIMARY KEY (id),
      FOREIGN KEY (role_id) REFERENCES role(id)
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
  const connection = await pool.getConnection()
  const mockdata = Mock.mock({
    [`users|${10}`]: [
      {
        username: '@name',
        email: '@email',
        birthdate: '@date',
      },
    ],
  });
  const defaultData = [
    {
      username: 'superadmin',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'superadmin@email.com',
      role_id: 1
    },
    {
      username: 'admin1',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'admin1@email.com',
      role_id: 2
    },
    {
      username: 'admin2',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'admin2@email.com',
      role_id: 2
    },
    {
      username: 'teacher1',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'teacher1@email.com',
      role_id: 3
    },
    {
      username: 'teacher2',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'teacher2@email.com',
      role_id: 3
    },
    {
      username: 'teacher3',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'teacher3@email.com',
      role_id: 3
    },
    {
      username: 'student1',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'student1@email.com',
      role_id: 4
    },
    {
      username: 'student2',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'student2@email.com',
      role_id: 4
    },
    {
      username: 'student3',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'student3@email.com',
      role_id: 4
    },
    {
      username: 'student4',
      password: mysql.raw(`SHA2('123456', 256)`),
      email: 'student4@email.com',
      role_id: 4
    },
  ]
  mockdata.users.forEach((user: any) => {
    user.password = mysql.raw(`SHA2('123456', 256)`);
  });
  mockdata.users.unshift(...defaultData)
  try {
    await connection.beginTransaction();
    await connection.query(`insert into role values (null, 'superadmin'), (null, 'admin'), (null, 'teacher'), (null, 'student')`)
    for (let user of mockdata.users) {
      await connection.query(`insert into users set ?`, user);
    }
    await connection.commit();
    await connection.release();
  } catch (e) {
    console.log('insert table error')
    console.log(e)
    connection.rollback();
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