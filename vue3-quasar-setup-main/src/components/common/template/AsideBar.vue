<template>
  <q-card>
    <q-list bordered separator>
      <q-expansion-item
        v-for="upper of category.menu"
        :key="upper.seq"
        :label="upper.name"
        default-opened
        dense
        class="text-weight-bold"
      >
        <q-separator />

        <q-item
          v-for="lower of upper.midCategory"
          :key="lower.seq"
          @click="navigatePage(lower)"
          clickable
          dense
          class="flex items-center text-weight-light"
          :class="lower.seq == modelValue ? 'active' : ''"
        >
          {{ lower.name }}
        </q-item>
      </q-expansion-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/authStore';
import { useSystemStore } from 'src/stores/systemStore';
import { watch } from 'vue';

const authStore = useAuthStore();
const systemStore = useSystemStore();

const { user, isAuthState } = storeToRefs(authStore);
const { category } = storeToRefs(systemStore);

const router = useRouter();
const route = useRoute();
// default.vue에서 바인딩한 변수, 현제 페이지 표시용
const modelValue = defineModel();

const { execute } = useAsyncState(() => getMenuList(user.value), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    console.log(res.data.list);
    if (res.status == 200) systemStore.setSystem(res.data);
  },
});

const navigatePage = (obj) => {
  const url = obj.postYn == 'Y' ? obj.url + obj.seq : obj.url;
  router.push(url);
  modelValue.value = obj.seq;
};

// 로그인 상태가 변경 시 메뉴를 새로 요청
watch(isAuthState, (newValue) => {
  execute();
});
</script>

<style scoped>
.active {
  border-right: 3px solid orange;
  background-color: #f0f0f0;
}
</style>
