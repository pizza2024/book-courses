
import { model, Schema } from "mongoose";
interface ITeacher {
  username?: string;
  password?: string;
  nickname?: string;
  TeacherRole?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
}
const TeacherSchema = new Schema<ITeacher>({
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
  TeacherRole: String,
  email: String,
  phone: String,
  createdAt: Date
}, {
  collection: 'Teacher',
  versionKey: false
});

const Teacher = model<ITeacher>('Teacher', TeacherSchema)

export default Teacher;