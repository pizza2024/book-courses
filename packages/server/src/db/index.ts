import pool from "./connection-pool";
export const queryAdmin = async () => {
  const [res] = await pool.query(`select a.username, a.email, r.name from admin as a, adminRole as r where a.adminRoleId = r.id`)
  return res;
}
export const queryStudent = async () => {
  const [res] = await pool.query(`select username, email, nickname from student`)
  return res;
}
export const queryTeacher = async () => {
  const [res] = await pool.query(`select username, email, nickname from teacher`)
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