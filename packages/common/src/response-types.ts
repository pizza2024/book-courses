
export type TypePublishedCourse = {
  id: number;
  courseId: number;
  teacherId: number;
  courseName: string;
  classRoom: string;
  canJoin: boolean;
  isOpen: boolean;
  startTime: string;
  endTime: string;
  teacherName: string;
  adminName: string;
}