<script setup lang="ts">
import { apiLogin } from '@/api';
import { ElButton } from 'element-plus';
import { reactive } from 'vue';
const data = reactive({
  username: '',
  password: '',
})
function login() {
  apiLogin(data).then(res => {
    if (res.data.success) {
      console.log(res.data)
    }
  })
}
</script>

<template>
  <main>
    <el-form label-width="100px">
      <el-form-item label="username">
        <el-input v-model="data.username"></el-input>
      </el-form-item>
      <el-form-item label="password">
        <el-input type="password" v-model="data.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :type="'primary'" @click="login">login</el-button>
      </el-form-item>
    </el-form>    
  </main>
</template>
