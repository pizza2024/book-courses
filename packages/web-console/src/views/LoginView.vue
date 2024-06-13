<script setup lang="ts">
import { apiLogin } from '@/api';
import { useTokenStore } from '@/stores/token';
import { ElButton } from 'element-plus';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const tokenStore = useTokenStore()
const router = useRouter()
const data = reactive({
  username: '',
  password: '',
})
function login() {
  apiLogin(data).then(res => {
    if (res.data.success) {
      tokenStore.setToken(res.data.token)
      router.push('/')
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
