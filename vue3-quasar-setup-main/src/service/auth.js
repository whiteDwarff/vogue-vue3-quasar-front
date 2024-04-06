// import { api } from 'src/boot/axios';

/**
 * @param { string } form 회원가입 정보
 * -------------------------------------------------------------------
 * @description <SignUpForm> 에서 입력한 회원정보를 통한 회원가입
 */
export async function signUp(form) {
  try {
    const auth = await api.post('/signUp', form);
    console.log(auth);
  } catch (err) {
    console.log(err);
  }
}
