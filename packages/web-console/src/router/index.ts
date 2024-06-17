import { useLoginStore } from '@/stores/login'
import AdminView from '@/views/AdminView.vue'
import PublishedCourseView from '@/views/PublishedCourseView.vue'
import StudentView from '@/views/StudentView.vue'
import TeacherView from '@/views/TeacherView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CourseView from '../views/CourseView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      redirect: '/login/student',
      children: [
        { path: 'student', name: 'loginstudent', component: LoginView },
        { path: 'admin', name: 'loginadmin', component: LoginView },
        { path: 'teacher', name: 'loginteacher', component: LoginView}
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter(to, from) {
        const login = useLoginStore()
        return login.loginType === 'admin'
      }
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherView
    },
    {
      path: '/course',
      name: 'course',
      component: CourseView
    },
    {
      path: '/publishedCourse',
      name: 'publishedCourse',
      component: PublishedCourseView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  if (!localStorage.getItem('book.token') && !to.fullPath.startsWith('/login')) {
    return {
      name: 'login'
    }
  }
})

export default router
