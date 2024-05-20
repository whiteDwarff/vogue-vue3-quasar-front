<template>
  <q-dialog
    v-model="model"
    persistent
    no-shake
    transition-hide="none"
    transition-show="none"
  >
    <q-card style="min-width: 300px" :style="{ maxWidth: maxWidth }">
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat dense round :ripple="false" v-close-popup />
      </q-card-section>

      <div class="text-center q-mb-lg">
        <span class="text-h5 text-weight-bold">{{ label }}</span>
      </div>
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
  label: {
    type: String,
    required: true,
  },
});
const model = defineModel();
</script>

<style lang="scss" scoped></style>
