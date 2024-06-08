import { defineStore } from 'pinia';
import { useLocalStorage, StorageSerializers } from '@vueuse/core'; // vueuse
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  // 로그인 상태를 담는 객체 login: true, logout : false
  const isAuthState = computed(() => !!user.value.seq);

  const router = useRouter();

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
      idntfCd: 'ROLE_ANONYMOUS',
    },
    {
      serializer: StorageSerializers.object,
    },
  );

  const setUser = (data) => {
    if (data) {
      user.value = data;
    } else {
      user.value = {
        seq: null,
        idntfCd: 'ROLE_ANONYMOUS',
      };
    }
  };
  const logout = () => {
    baseNotify(
      '로그아웃 하시겠습니까?',
      null,
      () => {
        setUser();
        router.push('/');
        baseNotify('로그아웃 되었습니다.');
      },
      true,
    );
  };
  return {
    isAuthState,
    user,
    setUser,
    logout,
  };
});
