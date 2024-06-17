export type LoginData = {
  type: 'student' | 'teacher' | 'admin'
  username: string;
  password: string;
}