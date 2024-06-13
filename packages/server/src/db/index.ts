import pool from "./connection-pool";

export const queryAllUsers = async () => {
  const [res] = await pool.query('select * from users', )
  return res;
}