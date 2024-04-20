<template>
  <!-- 레이아웃 단위의 root element : q-layot -->
  <q-layout view="lHh Lpr lff" class="bg-grey-2">
    <q-header bordered class="bg-white text-grey-9 flex q-py-md">
      <q-toolbar-title> default </q-toolbar-title>

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
        @click="authStore.setUser()"
      />
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <router-link to="/admin/category">go</router-link>
      <router-view />
    </q-page-container>

    <AuthDialog v-model="isDialog" />
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
const { system, isSisSystemState } = storeToRefs(systemStore);
// --------------------------------------------------------------------------

const route = useRoute();

const isDialog = ref(false);
// --------------------------------------------------------------------------
const { execute } = useAsyncState(getSystemAll, null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    if (res?.status == 200) systemStore.setSystems(res.data.list);
  },
});
if (!isSisSystemState) execute();
// --------------------------------------------------------------------------
const pageContainerStyles = computed(() => ({
  // route의 meta 속성에 width가 있다면 width, 없다면 1080px
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

<!--
@TODO: aside 마크업 참고 
### LIST ###
<q-list bordered separator>
        <q-expansion-item default-opened label="대분류">
          <q-separator />

          <q-item clickable>
            <q-item-section>Single line item</q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item default-opened label="대분류">
          <q-separator />

          <q-item clickable>
            <q-item-section>Single line item</q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item default-opened label="대분류">
          <q-separator />

          <q-item clickable>
            <q-item-section>Single line item</q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>



-->
