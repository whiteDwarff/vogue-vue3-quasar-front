<template>
  <q-dialog v-model="value">
    <q-card style="width: 400px">
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat dense round :ripple="false" v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <component
          :is="authViewComponents[viewMode]"
          @change-view="changeViewMode"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const value = defineModel();

// 반응형 상태 값
const viewMode = ref('SignInForm');
const changeViewMode = (mode) => (viewMode.value = mode);

// defineAsyncComponent()
const authViewComponents = {
  SignInForm: defineAsyncComponent(() => import('./SignInForm.vue')),
  SignUpForm: defineAsyncComponent(() => import('./SignUpForm.vue')),
};
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 400px
</route>
