<template>
  <q-dialog
    v-model="model"
    persistent
    no-shake
    transition-hide="none"
    transition-show="none"
  >
    <q-card style="min-width: 300px" :style="{ maxWidth: maxWidth }">
      <slot> </slot>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps({
  maxWidth: {
    type: String,
    default: () => '600px',
  },
});
const model = defineModel();
</script>

<style lang="scss" scoped></style>
