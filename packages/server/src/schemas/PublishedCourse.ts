import { model, Schema, Types } from "mongoose";
import { IAdmin } from "./Admin";
import { ICourse } from "./Course";
import { ITeacher } from "./Teacher";
interface IPublishedCourse {
  location: string;
  startTime?: Date;
  endTime?: Date;
  createdAt?: Date;
  admin?: IAdmin;
  teacher?: ITeacher;
  course?: ICourse;
}
const PublishedCourseSchema = new Schema<IPublishedCourse>({
  location: String,
  startTime: Date,
  endTime: Date,
  createdAt: Date,
  course: {
    type: Types.ObjectId,
    ref: 'Course'
  },
  teacher: {
    type: Types.ObjectId,
    ref: 'Teacher'
  },
  admin: {
    type: Types.ObjectId,
    ref: 'Admin'
  }
}, {
  collection: 'PublishedCourse',
  versionKey: false
});

const PublishedCourse = model<IPublishedCourse>('PublishedCourse', PublishedCourseSchema)

export default PublishedCourse;