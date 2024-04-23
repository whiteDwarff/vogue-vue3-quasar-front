<template>
  <!-- 페이지 단위의 root element :  q-page -->
  <div>auth : {{ user }}</div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/authStore';
const authStore = useAuthStore();
const { isAuthState, user } = storeToRefs(authStore);
</script>

<style lang="scss" scoped></style>
