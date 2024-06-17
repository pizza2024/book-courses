
import type { FormStudentType, LoginData, ModalAdmin, ModalCourse, ModalPublishedCourse, ModalStudent, ModalTeacher } from "common";
import request from "./request";
export const apiLogin = (data: LoginData) => request.post('/api/login', data)
export const apiAdminList = () => request.get<{ success: Boolean; rows: ModalAdmin[] }>('/api/adminlist')
export const apiPostStudent = (data: FormStudentType) => request.post<{ success: Boolean; rows: ModalStudent[] }>('/api/student', data)
export const apiStudentList = () => request.get<{ success: Boolean; rows: ModalStudent[] }>('/api/studentlist')
export const apiTeacherList = () => request.get<{ success: Boolean;  rows: ModalTeacher[]}>('/api/teacherlist')
export const apiCourseList = () => request.get<{ success: Boolean;  rows: ModalCourse[]}>('/api/courselist')
export const apiPublishedCourseList = () => request.get<{ success: Boolean;  rows: ModalPublishedCourse[]}>('/api/publishedCourseList')