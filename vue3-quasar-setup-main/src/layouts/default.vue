<template>
  <!-- 레이아웃 단위의 root element : q-layot -->
  <q-layout view="lHh Lpr lff" class="bg-grey-2">
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar> default </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>
<style lang="scss" scoped>
// <q-btn> hover 시 backgroud 제거
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
