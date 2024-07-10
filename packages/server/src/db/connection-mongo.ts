import { connect } from 'mongoose';
import '../schemas';
const DB_URL = 'mongodb://localhost:27017/test';
export default async function getConnection() {
  await connect(DB_URL);
}