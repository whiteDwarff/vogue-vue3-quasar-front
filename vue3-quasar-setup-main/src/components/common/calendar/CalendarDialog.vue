<template>
  <BaseDialog v-model="isDialog" label="일정 등록">
    <q-card-section>
      <CalendarForm
        v-model="form"
        @success="$emit('update:modelValue', true)"
      />
    </q-card-section>
  </BaseDialog>
</template>

<script setup>
const isDialog = defineModel('isDialog');
const form = defineModel('form');
</script>
