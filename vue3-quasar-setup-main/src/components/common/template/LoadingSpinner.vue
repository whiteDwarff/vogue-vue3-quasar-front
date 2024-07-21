<template>
  <div id="spinner-wrap" v-if="loading">
    <q-spinner-ios size="60px" color="purple" :thickness="10" id="spinner" />
  </div>
</template>

<script setup>
const loading = defineModel();

watch(
  () => loading.value,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
  },
);
</script>
<style scoped>
#spinner-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
}
#spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
</style>
