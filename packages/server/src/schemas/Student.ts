
import { model, Schema } from "mongoose";
interface IStudent {
  username?: string;
  password?: string;
  nickname?: string;
  StudentRole?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
}
const StudentSchema = new Schema<IStudent>({
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
  StudentRole: String,
  email: String,
  phone: String,
  createdAt: Date
}, {
  collection: 'Student',
  versionKey: false
});

const Student = model<IStudent>('Student', StudentSchema)

export default Student;