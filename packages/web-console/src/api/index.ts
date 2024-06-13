import request from "./request";

type LoginData = {
  username: string;
  password: string;
}
export const apiLogin = (data: LoginData) => request.post('/api/login', data)
export type User = {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  is_active: boolean;
}
export const apiUserList = () => request.get<{ success: boolean; users: User[]}>('/api/users')