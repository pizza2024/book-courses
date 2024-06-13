<script setup lang="ts">
import { useTokenStore } from '@/stores/token';

const tokenStore = useTokenStore()
</script>

<template>
  <main>
    {{ tokenStore }}
  </main>
</template>
