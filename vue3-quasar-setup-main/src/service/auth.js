// import { api } from 'src/boot/axios';

/**
 * @param { string } form 회원가입 정보
 * @return { promise } 201 status 반환
 * -------------------------------------------------------------------
 * @description <SignUpForm> 에서 입력한 회원정보를 통한 회원가입
 */
export async function signUp(form) {
  try {
    return await api.post('/auth/signUp', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param { string } form 이메일
 * @return { promise } 200 status 반환
 * -------------------------------------------------------------------
 * @description
 */
export async function duplicatedEmail(form) {
  try {
    return await api.post('/auth/hasEmail', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param { string } form 로그인 정보
 * @return { promise } 사용자 정보, 200 status
 * -------------------------------------------------------------------
 * @description
 */
export async function signIn(form) {
  try {
    return await api.post('/auth/signIn', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
