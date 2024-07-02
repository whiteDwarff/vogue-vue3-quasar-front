<template>
  <q-card>
    <q-list bordered separator>
      <q-item class="q-pa-none">
        <!-- 로그인 상태 -->
        <UserProfile v-if="isAuthState" :user size="40" div="가입일">
          <template #caption>
            <div></div>
          </template>
        </UserProfile>
        <!-- 로그인 상태가 아닌 경우 -->
        <div v-else class="full-width flex items-center justify-center q-py-md">
          <q-btn
            @click="$emit('update:dialog', 'SignUpForm')"
            label="가입하기"
            class="bg-grey-14 text-white text-bold"
            style="width: 85%"
            unelevated
            :ripple="false"
          />
          <!-- 로그인 후 이용해주세요. -->
        </div>
      </q-item>
      <q-item v-if="isAuthState" class="full-width q-py-md">
        <q-btn
          @click="$router.push('/posts/add')"
          class="full-width"
          unelevated
          color="secondary"
          :ripple="false"
        >
          <q-avatar
            size="xs"
            color="white"
            text-color="teal"
            icon="add"
            class="q-mx-md"
          />
          <span> 게시글 작성</span>
        </q-btn>
      </q-item>
      <q-expansion-item
        v-for="upper of category.menu"
        :key="upper.seq"
        :label="upper.name"
        default-opened
        dense
        class="text-subtitle2"
      >
        <q-separator />
        <q-item
          v-for="lower of upper.midCategory"
          :key="lower.seq"
          @click="navigatePage(lower)"
          clickable
          dense
          class="flex items-center text-weight-light"
          :class="setCurrentPage(lower)"
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

const authStore = useAuthStore();
const systemStore = useSystemStore();

const { user, isAuthState } = storeToRefs(authStore);
const { category } = storeToRefs(systemStore);

const router = useRouter();
const route = useRoute();

defineEmits(['update:dialog']);

// default.vue에서 바인딩한 변수, 현제 페이지 표시용
const modelValue = defineModel();

const { execute } = useAsyncState(() => getMenuList(user.value), null, {
  immediate: true,
  throwError: true,
  onSuccess: ({ data }) => {
    if (data.status == 'OK') systemStore.setSystem(data);
  },
});

// 현재 페이지에 active class를 추가
const setCurrentPage = (item) => {
  // 게시판
  if (item.postYn == 'Y')
    return route.fullPath.includes(item.url + item.seq) ? 'active' : '';
  // 관리자화면
  else return item.url === route.fullPath ? 'active' : '';
};

// 페이지 이동
const navigatePage = (obj) => {
  const url = obj.postYn == 'Y' ? obj.url + obj.seq : obj.url;
  router.push(url);
  modelValue.value = obj.seq;
};

// 로그인 상태가 변경 시 (로그인, 로그아웃) 메뉴를 새로 요청
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
