import { User } from "./modal";

export type LoginData = {
  type: 'student' | 'teacher' | 'admin'
  username: string;
  password: string;
}

export type FormStudentType = Omit<User, 'id'> & { password: string };