
import { Test } from "common";
import pool from "./connection-pool";
export const queryAllUsers = async () => {
  const test: Test = {
    hello: 'world'
  }
  const [res] = await pool.query('select * from users', )
  return res;
}