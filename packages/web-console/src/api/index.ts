import type { User } from "@/types";
import request from "./request";

type LoginData = {
  username: string;
  password: string;
}
export const apiLogin = (data: LoginData) => request.post('/api/login', data)
export const apiUserList = () => request.get<{ success: boolean; users: User[]}>('/api/users')