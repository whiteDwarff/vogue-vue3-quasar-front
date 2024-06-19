<template>
  <q-dialog
    v-model="value"
    persistent
    no-shake
    transition-hide="none"
    transition-show="none"
  >
    <q-card style="width: 400px">
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat dense round :ripple="false" v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <component
          :is="authViewComponents[viewMode]"
          @change-view="changeViewMode"
          @close-dialog="$emit('update:modelValue', false)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const value = defineModel();

// 반응형 상태 값
const viewMode = defineModel('viewMode');
//const viewMode = ref('SignInForm');
const changeViewMode = (mode) => (viewMode.value = mode);
// Google ReCaptch token
const token = ref('');

// defineAsyncComponent()
const authViewComponents = {
  SignInForm: defineAsyncComponent(() => import('./SignInForm.vue')),
  SignUpForm: defineAsyncComponent(() => import('./SignUpForm.vue')),
  FindByEmailForm: defineAsyncComponent(() => import('./FindByEmailForm.vue')),
  FindByPasswordForm: defineAsyncComponent(() =>
    import('./FindByPasswordForm.vue'),
  ),
};
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 400px
</route>
