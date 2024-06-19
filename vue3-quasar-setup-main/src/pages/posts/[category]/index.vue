<template>
  <div>
    <q-card></q-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
console.log(route.params);
</script>
