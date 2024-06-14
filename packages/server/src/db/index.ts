import pool from "./connection-pool";
export const queryAdmin = async () => {
  const [res] = await pool.query(`select a.username, a.email, r.name from admin as a, adminRole as r where a.adminRoleId = r.id`)
  return res;
}