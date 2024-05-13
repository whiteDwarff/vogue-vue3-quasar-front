<template>
  <q-dialog
    v-model="model"
    persistent
    no-shake
    transition-hide="none"
    transition-show="none"
  >
    <q-card style="min-width: 300px; max-width: 600px"> </q-card>
  </q-dialog>
</template>

<script setup>
const model = defineModel();
</script>

<style lang="scss" scoped></style>
