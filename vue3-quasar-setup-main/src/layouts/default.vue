<template>
  <!-- 레이아웃 단위의 root element : q-layot -->
  <q-layout view="lHh Lpr lff" class="bg-grey-2">
    <q-header bordered class="bg-white text-grey-9 flex q-py-md">
      <q-toolbar-title>
        <router-link to="/" @click="currentPage = 0"> default </router-link>
      </q-toolbar-title>

      <q-space />
      <q-btn
        v-if="!isAuthState"
        label="로그인 • 회원가입"
        dense
        unelevated
        rounded
        class="bg-black text-white q-pa-sm"
        :ripple="false"
        @click="isDialog = true"
      />
      <q-btn
        v-if="isAuthState"
        label=" 로그아웃 "
        dense
        unelevated
        rounded
        class="bg-black text-white q-pa-sm"
        :ripple="false"
        @click="authStore.logout()"
      />
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <q-page padding class="row q-col-gutter-x-md">
        <!-- aside  -->
        <AsideBar v-model="currentPage" class="col-3 q-pl-none" />

        <!-- router-view -->
        <router-view class="col-9" />
      </q-page>
    </q-page-container>

    <AuthDialog v-model="isDialog" />
  </q-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/authStore';
import { useSystemStore } from 'src/stores/systemStore';
import { baseNotify } from 'src/utils/base-notify';

// --------------------------------------------------------------------------
const authStore = useAuthStore();
const { isAuthState, user } = storeToRefs(authStore);
// --------------------------------------------------------------------------
const route = useRoute();
// 로그인, 회원가입 dialog state
const isDialog = ref(false);
const currentPage = ref(route.fullPath);

// --------------------------------------------------------------------------
// route의 meta 속성에 width가 있다면 width, 없다면 1080px
const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '80%',
  margin: '0 auto',
}));
</script>

<style>
/* <q-btn> hover 시 backgroud 제거 */
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
.border {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.decoration-none {
  text-decoration: none;
}
</style>
