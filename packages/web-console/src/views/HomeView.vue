<script setup lang="ts">
import { useLoginStore } from '@/stores/login';
import { ElCol, ElRow, type ElContainer } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter()
const loginStore = useLoginStore()
function signout() {
  loginStore.token = null;
  localStorage.clear();
  router.replace({
    name: 'login'
  })
}
</script>

<template>
  <ElContainer>
    <ElRow>
      <ElCol>
        <p>
          {{ loginStore.username }}
        </p>
      </ElCol>
      <ElCol>
        <ElButton @click="signout">sign out</ElButton>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
