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
  name: string,
  adminId: number
}
export type ModalPublishedCourse = {
  id: number;
  courseId: number;
  teacherId: number;
  classRoom?: string;
  startTime: string;
  endTime: string;
  isOpen?: boolean;
  canJoin?: boolean;
  adminId: number;
}