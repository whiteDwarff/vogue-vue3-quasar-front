import { boot } from 'quasar/wrappers';
import axios from 'axios';

/**
 * CORS
 * - view <-> server 통신간 `/api` 경로 필수
 * - default 값으로, 사용 시 이후 경로부터 작성
 */
const api = axios.create({ baseURL: '/api' });

export default boot(({ app }) => {
  // Option API 전용
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  axios.defaults.withCredentials = true;
});

export { axios, api };

/**
 * @doc :  https://axios-http.com/kr/docs/req_config
 * 
 * ❗️ axios 사용
 * import { api } from "src/boot/axios";
 * 
 * const test = async () => {
  try {
    const result = await api.get("/index");
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const sayHello = async () => {
  try {
    const result = await api.get("/hello");
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
 * 
 */
