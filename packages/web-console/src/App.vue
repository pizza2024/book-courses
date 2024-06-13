<script setup lang="ts">
import MenuNav from '@/components/MenuNav.vue';
import { ElAside, ElContainer, ElMain } from 'element-plus';
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <MenuNav/>
    </el-aside>
    <el-main>
      <RouterView/>
    </el-main>
  </el-container>
</template>
