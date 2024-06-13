import request from "./request";

type LoginData = {
  username: string;
  password: string;
}
export const apiLogin = (data: LoginData) => request.post('/api/login', data)
