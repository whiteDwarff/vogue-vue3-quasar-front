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
          :token
          @change-view="changeViewMode"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3';

const value = defineModel();

// 반응형 상태 값
const viewMode = ref('SignInForm');
const changeViewMode = (mode) => (viewMode.value = mode);
// Google ReCaptch token
const token = ref('');

// defineAsyncComponent()
const authViewComponents = {
  SignInForm: defineAsyncComponent(() => import('./SignInForm.vue')),
  SignUpForm: defineAsyncComponent(() => import('./SignUpForm.vue')),
};

// --------------------------------------------------------------------------
// Google ReCaptch 사용 v-bind로 토큰 값 넘김
const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

const recaptcha = async () => {
  await recaptchaLoaded();
  token.value = await executeRecaptcha('auth');
};
recaptcha();
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 400px
</route>
