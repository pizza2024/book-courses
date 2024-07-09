
import { model, Schema } from "mongoose";
export interface IAdmin {
  username?: string;
  password?: string;
  nickname?: string;
  adminRole?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
}
const adminSchema = new Schema<IAdmin>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  nickname: String,
  adminRole: String,
  email: String,
  phone: String,
  createdAt: Date
}, {
  collection: 'Admin',
  versionKey: false
});

const Admin = model<IAdmin>('Admin', adminSchema)

export default Admin;