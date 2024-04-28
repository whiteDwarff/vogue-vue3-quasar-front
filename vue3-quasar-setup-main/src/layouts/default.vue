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
    <!-- :style="pageContainerStyles" -->
    <q-page-container :style="pageContainerStyles">
      <q-page padding class="row q-col-gutter-x-md">
        <!-- aside  -->
        <AsideBar class="col-3 q-pl-none" />

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

// --------------------------------------------------------------------------
const authStore = useAuthStore();
const systemStore = useSystemStore();
const { isAuthState, user } = storeToRefs(authStore);
const { system, isSisSystemState } = storeToRefs(systemStore);
// --------------------------------------------------------------------------
const route = useRoute();

const isDialog = ref(false);
// --------------------------------------------------------------------------
// 카테고리 및 유저권한 셋팅
/*
const { execute } = useAsyncState(() => getSystemAll(user.value), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    if (res?.status == 200) {
      const categorys = res.data.list.category;

      for (let category of categorys) {
        const childrens = JSON.parse(category.midCategory);
        const arr = [];
        for (let children of childrens)
          if (category.seq == children.upperSeq) arr.push(children);
        category.midCategory = [...arr];
      }
      systemStore.setSystems(res.data.list, categorys);
      console.log(111);
    }
  },
});
*/
// --------------------------------------------------------------------------
const pageContainerStyles = computed(() => ({
  // route의 meta 속성에 width가 있다면 width, 없다면 1080px
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
