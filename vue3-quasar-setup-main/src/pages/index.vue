<template>
  <!-- 페이지 단위의 root element :  q-page -->
  <q-page padding> auth : {{ user }} </q-page>
</template>

<script setup>
import { useAuthStore } from 'src/stores/authStore';
const authStore = useAuthStore();
const { isAuthState, user } = storeToRefs(authStore);
</script>

<style lang="scss" scoped></style>
