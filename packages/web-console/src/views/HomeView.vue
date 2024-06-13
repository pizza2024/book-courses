<script setup lang="ts">
import { useTokenStore } from '@/stores/token';
import { ElCol, ElRow, type ElContainer } from 'element-plus';

const tokenStore = useTokenStore()
</script>

<template>
  <ElContainer>
    <ElRow>
      <ElCol>
        <p>
          {{ tokenStore }}
        </p>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
