<template>
  <!-- 레이아웃 단위의 root element : q-layot -->
  <q-layout view="lHh Lpr lff" class="bg-grey-2">
    <q-header
      bordered
      class="bg-white text-grey-9 flex q-py-md"
      style="z-index: 1"
    >
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
        @click="changeDialog('SignInForm')"
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
        <AsideBar
          @update:dialog="changeDialog"
          v-model="currentPage"
          class="col-3 q-pl-none"
        />

        <!-- router-view -->
        <router-view class="col-9" />
      </q-page>
    </q-page-container>

    <!-- login, join -->
    <AuthDialog v-model="isDialog" v-model:viewMode="viewMode" />

    <LoadingSpinner v-model="loadingState" />
  </q-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/authStore';
import { useSystemStore } from 'src/stores/systemStore';

// --------------------------------------------------------------------------
const authStore = useAuthStore();
const systemStore = useSystemStore();

const { isAuthState, user } = storeToRefs(authStore);
const { loadingState } = storeToRefs(systemStore);
// --------------------------------------------------------------------------
const route = useRoute();
// 로그인, 회원가입 dialog state
const isDialog = ref(false);
const viewMode = ref('SignInForm');
const currentPage = ref(route.fullPath);

// --------------------------------------------------------------------------
// route의 meta 속성에 width가 있다면 width, 없다면 1080px
const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '90%',
  margin: '0 auto',
}));

const changeDialog = ($event) => {
  isDialog.value = true;
  viewMode.value = $event;
};
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
