
import { model, Schema, Types } from "mongoose";
import { IAdmin } from "./Admin";
interface ICourse {
  name: string;
  createdAt?: Date;
  admin?: IAdmin;
}
const CourseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true
  },
  admin: {
    type: Types.ObjectId,
    ref: 'Admin'
  },
  createdAt: Date
}, {
  collection: 'Course',
  versionKey: false
});

const Course = model<ICourse>('Course', CourseSchema)

export default Course;