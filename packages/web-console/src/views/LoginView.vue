<script setup lang="ts">
import { apiLogin } from '@/api';
import { useLoginStore } from '@/stores/login';
import { ElButton } from 'element-plus';
import { computed, reactive } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
const loginStore = useLoginStore()
const router = useRouter()
const route = useRoute()
const data = reactive({
  username: '',
  password: '',
})
const isLoginStudent = computed(() => {
  return route.name === 'loginstudent'
})
const isLoginTeacher = computed(() => {
  return route.name === 'loginteacher'
})
const isLoginAdmin = computed(() => {
  return route.name === 'loginadmin' 
})
const loginType = computed(() => {
  return isLoginStudent.value ? 'student' : isLoginTeacher.value ? 'teacher' : 'admin'
})
const formName = computed(() => {
  return isLoginStudent.value ? '学生登录' : isLoginTeacher.value ? '老师登录' : '管理员登录'
})
function login() {
  apiLogin({
    type: loginType.value,
    ...data
  }).then(res => {
    if (res.data.success) {
      loginStore.setUsername(res.data.username)
      loginStore.setToken(res.data.token)
      loginStore.setLoginType(res.data.type)
      localStorage.setItem('book.token', res.data.token)
      router.push('/')
    }
  })
}
</script>

<template>
  <main class="fixed">
    <el-form label-width="100px">
      <el-form-item>{{formName}}</el-form-item>
      <el-form-item label="username">
        <el-input v-model="data.username"></el-input>
      </el-form-item>
      <el-form-item label="password">
        <el-input type="password" v-model="data.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :type="'primary'" @click="login">login</el-button>
      </el-form-item>
      <el-form-item v-if="isLoginStudent">
        <RouterLink active-class="link" class="link" to="/login/teacher">teacher login</RouterLink>
      </el-form-item>
      <el-form-item v-if="isLoginTeacher">
        <RouterLink active-class="link" class="link" to="/login/admin">admin login</RouterLink>
      </el-form-item>
      <el-form-item v-if="isLoginAdmin">
        <RouterLink active-class="link" class="link" to="/login/student">student login</RouterLink>
      </el-form-item>
    </el-form>    
  </main>
</template>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link {
  color: blue;
}
</style>
