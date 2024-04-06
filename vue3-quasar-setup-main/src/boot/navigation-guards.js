import { storeToRefs } from 'pinia';
import { boot } from 'quasar/wrappers';
import { baseNotify } from 'src/utils/index';
// import { userAuthStore } from 'src/stores/auth';

/*
  ❗️ TODO: 로그인 구현이 구현되면 requiresAuth() 에 추가하기
  const { isAuthenticated } = storeToRefs(userAuthStore()); // 로그인 상태 : true
  if(to.matched.some((record) => record.meta.requiresAuth && !isAuthenticated.value) {...}
*/

function requiresAuth(to) {
  /*
    to.matched : 접근할 URL과 router에 매칭된 모든 값을 배열로 가지고 있는 속성
    some       : 배열에서 하나라도 만족하는 값이 있다면 true 반환
  */
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    baseNotify('로그인 후 이용해주세요', '', false, { type: 'negative' });
    return '/';
  }
}

export default boot(async ({ app, router }) => {
  router.beforeEach(requiresAuth);
});
/**
 * ⚙️ install 
 *   - quasar new boot navigation-guards.js
 * 
 * ⚙️ quasar.config.js
 *   - boot: ['navigation-guards'] add
 * 
 * ✔️ navigation guard를 설정할 컴포넌트에 'route meta' 속성 정의
    <route lang="yaml">
      meta:
        requiresAuth: true
    </route>
*
*  ⭐️ 로그인 상태가 아니거나 route.meta.requiresAuth가 true라면 navigation guard 설정
 */
