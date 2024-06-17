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
export const queryCourse = async () => {
  const [res] = await pool.query(`select * from course`)
  return res;
}
export const queryPublishedCourse = async () => {
  const [res] = await pool.query(`select * from publishedCourse`)
  return res;
}