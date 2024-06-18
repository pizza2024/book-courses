import { FormCourseType, ModalPublishedCourse, ModalStudent, ModalTeacher } from "common";
import pool from "./connection-pool";
export const queryAdmin = async () => {
  const [res] = await pool.query(`select a.username, a.email, r.name from admin as a, adminRole as r where a.adminRoleId = r.id`)
  return res;
}
export const queryAdminByUsername = async (username: string) => {
  const [res] = await pool.query(`select * from admin as a, adminRole as b where a.username = "${username}" and a.id = b.id`);
  return res;
}
export const queryStudent = async () => {
  const [res] = await pool.query(`select username, email, nickname from student`)
  return res;
}
export const queryStudentByUsername = async (username: string) => {
  const [res] = await pool.query(`select s.username, s.password, s.email, s.phone, s.nickname, a.nickname as adminNickname from student as s, admin as a where s.username = "${username}" and s.adminId = a.id`);
  return res;
}
export const queryPostStudent = async (data: ModalStudent) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const res = await connection.query(`insert into student set ?`, data);
    await connection.commit();
    await connection.release();
    return res
  } catch (e) {
    await connection.rollback()
    return e
  }
  
}
export const queryTeacher = async () => {
  const [res] = await pool.query(`select username, email, nickname from teacher`)
  return res;
}
export const queryTeacherByUsername = async (username: string) => {
  const [res] = await pool.query(`select t.username, t.password, t.email, t.phone, t.nickname, a.nickname as adminNickname from teacher as t, admin as a where t.username = "${username}" and t.adminId = a.id`);
  console.log('queryTeacherByUsername res is')
  console.log(res)
  return res;
}
export const queryPostTeacher = async (data: ModalTeacher) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const res = await connection.query(`insert into teacher set ?`, data);
    await connection.commit();
    await connection.release();
    return res
  } catch (e) {
    await connection.rollback()
    return e
  }
}
export const queryTeachersByName = async (teacherName: string) => {
  const [res] = await pool.query('select * from teacher where username like "%' + teacherName + '%"');
  return res
}
export const queryCourse = async () => {
  const [res] = await pool.query(`select * from course`)
  return res;
}
export const queryPostCourse = async (data: FormCourseType) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const res = await connection.query(`insert into course set ?`, data);
    await connection.commit();
    await connection.release();
    return res
  } catch (e) {
    await connection.rollback()
    return e
  }
}
export const queryPublishedCourse = async () => {
  const [res] = await pool.query(`select
    p.id,
    c.name as courseName,
    t.username as teacherName,
    p.classRoom as classRoom,
    p.startTime,
    p.endTime,
    p.isOpen as isOpen,
    p.canJoin as canJoin,
    a.username as adminName,
    p.courseId,
    p.teacherId
  from
    publishedCourse as p
  left join teacher as t on p.teacherId = t.id
  left join course as c on p.courseId = c.id
  left join admin as a on p.adminId = a.id
    `)
  return res;
}
export const queryCourseByName = async (courseName: string) => {
  const [res] = await pool.query(`select * from course where name like "%${courseName}%"`);
  return res;
}
export const insertPublishedCourses = async (courses: Omit<ModalPublishedCourse, 'id'>[]) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction()
    const result = []
    for (let x of courses) {
      const res = await connection.query('insert into publishedCourse set ?', x)
      result.push(res)
    }
    const res = await connection.commit()
    connection.release();
    return res
  } catch (e) {
    await connection.rollback();
    connection.release();
    return e
  }
}