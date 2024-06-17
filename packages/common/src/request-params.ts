import { ModalCourse, User } from "./modal";

export type LoginData = {
  type: 'student' | 'teacher' | 'admin'
  username: string;
  password: string;
}

export type FormStudentType = Omit<User, 'id'> & { password: string };
export type FormTeacherType = Omit<User, 'id'> & { password: string };
export type FormCourseType = Omit<ModalCourse, 'id'>;