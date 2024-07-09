
import { model, Schema, Types } from "mongoose";
import { IAdmin } from "./Admin";
export interface ICourse {
  name: string;
  admin?: IAdmin;
  createdAt?: Date;
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