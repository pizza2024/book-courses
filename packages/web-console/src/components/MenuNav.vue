<template>
  <el-menu
    default-active="home"
    class="el-menu-vertical-demo"
  >
    <RouterLink to="/" :class="'menu-link'">
      <el-menu-item index="home">
        <el-icon><icon-menu /></el-icon>
        <span>home</span>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/admin" :class="'menu-link'" v-if="isAdmin">
      <el-menu-item index="admin">
        <el-icon><icon-menu /></el-icon>
        <span>admin</span>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/student" :class="'menu-link'" v-if="isAdmin">
      <el-menu-item index="student">
        <el-icon><icon-menu /></el-icon>
        <span>student</span>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/teacher" :class="'menu-link'" v-if="isAdmin">
      <el-menu-item index="teacher">
        <el-icon><icon-menu /></el-icon>
        <span>teacher</span>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/course" :class="'menu-link'" v-if="isAdmin">
      <el-menu-item index="course">
        <el-icon><icon-menu /></el-icon>
        <span>course</span>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/publishedCourse" :class="'menu-link'">
      <el-menu-item index="publishedCourse">
        <el-icon><icon-menu /></el-icon>
        <span>published course</span>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/about" :class="'menu-link'">
      <el-menu-item index="about">
        <el-icon><icon-menu /></el-icon>
        <span>about</span>
      </el-menu-item>
    </RouterLink>
  </el-menu>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/stores/login';
import {
  Menu as IconMenu
} from '@element-plus/icons-vue';
import { computed } from 'vue';
const loginStore = useLoginStore()
const isAdmin = computed(() => {
  return loginStore.loginType === 'admin'
})
</script>
<style scoped lang="scss">
.menu-link {
  color: red;
  text-decoration: none;
}
</style>