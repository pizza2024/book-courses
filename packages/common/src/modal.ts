export type User = {
  id: number,
  username: string,
  email?: string,
  phone?: string,
  nickname?: string
}
export type ModalAdmin = User;
export type ModalTeacher = User & { adminId: number };
export type ModalStudent = User & { adminId: number };
export type ModalCourse = {
  id: number,
  name: number,
  adminId: number
}
export type ModalPublishedCourse = {
  courseId: number;
  teacherId: number;
  location: string;
  startTime: string;
  endTime: string;
  launchTime: string;
  removeTime: string;
  repeat: string;
  active: boolean
}