<template>
  <q-dialog v-model="value">
    <q-card style="width: 400px">
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat dense round :ripple="false" v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <SignUpForm />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const value = defineModel();
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 400px
</route>
