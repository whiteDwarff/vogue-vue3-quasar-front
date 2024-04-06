<template>
  <!-- 레이아웃 단위의 root element : q-layot -->
  <q-layout view="lHh Lpr lff" class="bg-grey-2">
    <q-header bordered class="bg-white text-grey-9 flex q-py-md">
      <q-toolbar-title> default </q-toolbar-title>

      <q-space />

      <q-btn
        label="로그인 • 회원가입"
        dense
        unelevated
        rounded
        class="bg-black text-white q-pa-sm"
        :ripple="false"
        @click="isDialog = true"
      />
    </q-header>
    <q-page-container :style="pageContainerStyles">
      <router-view />
    </q-page-container>

    <AuthDialog v-model="isDialog" />
  </q-layout>
</template>

<script setup>
const route = useRoute();

const isDialog = ref(false);

const pageContainerStyles = computed(() => ({
  // route의 meta 속성에 width가 있다면 width, 없다면 1080px
  // <router lang="yaml"> 속성
  maxWidth: route.meta?.width || '1080px',
  margin: '0 auto',
}));
</script>
<style lang="scss" scoped>
// <q-btn> hover 시 backgroud 제거
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
