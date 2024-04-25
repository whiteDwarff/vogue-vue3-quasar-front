import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  // 로그인 상태를 담는 객체 login: true, logout : false
  const isAuthState = computed(() => !!user.seq);
  // 사용자의 정보를 담는 객체
  const user = ref({
    seq: null,
    idntfCd: 'ROLE_SYS',
  });

  const setUser = (data) => {
    if (data) {
      user.value = data;
    } else {
      // TODO: Notify로 로그아웃 하시겠습니까? actions 실행 로직 추가
      user.value = null;
    }
  };
  return {
    isAuthState,
    user,
    setUser,
  };
});
