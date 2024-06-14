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
    <RouterLink to="/admin" :class="'menu-link'">
      <el-menu-item index="admin">
        <el-icon><icon-menu /></el-icon>
        <span>admin</span>
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
import {
  Menu as IconMenu
} from '@element-plus/icons-vue';
</script>
<style scoped lang="scss">
.menu-link {
  color: red;
  text-decoration: none;
}
</style>