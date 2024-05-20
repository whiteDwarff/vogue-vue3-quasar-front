import { defineStore } from 'pinia';
import { useLocalStorage, StorageSerializers } from '@vueuse/core'; // vueuse

export const useAuthStore = defineStore('auth', () => {
  // 로그인 상태를 담는 객체 login: true, logout : false
  const isAuthState = computed(() => !!user.value.seq);

  /**
   * @vueuse
   * @doc :https://vueuse.org/
   * @install : npm i @vueuse/core
   * ---------------------------------
   * @summary
   * - useLocalStorage( key, defaultValue, options )
   * - serializer: StorageSerializers.object : Object -> String Type으로 형변환 ( 반응형 ref 객체 )
   */
  const user = useLocalStorage(
    // LocalStorage에 저장될 key
    'auth/user',
    // Default Value
    {
      seq: null,
      // 개발용 -> 추후 'ROLE_ANONYMOUS'로 변경
      idntfCd: 'ROLE_SYS',
    },
    {
      serializer: StorageSerializers.object,
    },
  );

  console.log(user);

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
