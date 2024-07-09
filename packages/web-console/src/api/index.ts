
import type { FormCourseType, FormStudentType, FormTeacherType, LoginData, ModalAdmin, ModalCourse, ModalPublishedCourse, ModalStudent, ModalTeacher, TypePublishedCourse } from "common";
import request from "./request";
export const apiLogin = (data: LoginData) => request.post('/api/login', data)
export const apiRegist = (data: LoginData) => request.post('/api/regist', data)
export const apiAdminList = () => request.get<{ success: Boolean; rows: ModalAdmin[] }>('/api/adminlist')
export const apiPostStudent = (data: FormStudentType) => request.post<{ success: Boolean; student: ModalStudent }>('/api/student', data)
export const apiStudentList = () => request.get<{ success: Boolean; rows: ModalStudent[] }>('/api/studentlist')
export const apiTeacherList = () => request.get<{ success: Boolean;  rows: ModalTeacher[]}>('/api/teacherlist')
export const apiPostTeacher = (data: FormTeacherType) => request.post<{ success: Boolean; teacher: ModalTeacher }>('/api/teacher', data)
export const apiQueryTeachersByName = (teacherName: string) => request.get<{ success: boolean; teachers: ModalTeacher[] }>('/api/teacher', {
  params: {
    teacherName: teacherName
  }
})
export const apiCourseList = () => request.get<{ success: Boolean;  rows: ModalCourse[]}>('/api/courselist')
export const apiPostCourse = (data: Omit<FormCourseType, 'adminId'>) => request.post<{ success: Boolean; course: ModalCourse }>('/api/course', data)
export const apiQueryCourseByName = (courseName: string) => request.get<{ success: Boolean; courses: ModalCourse[] }>('/api/course', {
  params: {
    courseName: courseName
  }
});
export const apiPublishedCourseList = () => request.get<{ success: Boolean;  rows: TypePublishedCourse[]}>('/api/publishedCourseList')
export const apiPublishCourses = (courses: Omit<Omit<ModalPublishedCourse, 'id'>, 'adminId'>[]) => request.post<{
  success: boolean,
  msg?: string
}>('/api/publishedCourseList', {
  courses: courses
})