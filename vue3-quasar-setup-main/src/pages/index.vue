<template>
  <!-- 페이지 단위의 root element :  q-page -->
  <div>auth : {{ user }}</div>
  <div>category : {{ category }}</div>
  <div>system: {{ system }}</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/authStore';
import { useSystemStore } from 'src/stores/systemStore';

const authStore = useAuthStore();
const systemStore = useSystemStore();
const { isAuthState, user } = storeToRefs(authStore);
const { system, category } = storeToRefs(systemStore);

//console.log(category.value);
</script>

<style lang="scss" scoped></style>
