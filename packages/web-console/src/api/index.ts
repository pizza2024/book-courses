
import type { LoginData, User } from "common";
import request from "./request";
export const apiLogin = (data: LoginData) => request.post('/api/login', data)
export const apiUserList = () => request.get<{ success: boolean; users: User[]}>('/api/users')