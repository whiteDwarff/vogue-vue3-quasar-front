/**
 * @param { string } form 회원가입 정보
 * @return { promise } 201 status 반환
 * -------------------------------------------------------------------
 * @description 회원가입
 */
export async function signUp(form) {
  console.log(form);
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
 * @description 이메일 중복검사
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
 * @description 로그인
 */
export async function signIn(form) {
  try {
    return await api.post('/auth/signIn', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param { string } form 사용자 정보
 * @return { promise } 사용자 이메일, 200 status
 * -------------------------------------------------------------------
 * @description 이메일 찾기
 */
export async function findByEmail(form) {
  try {
    return await api.post('/auth/email', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param { string } form 사용자 정보
 * @return { promise } 200 status
 * -------------------------------------------------------------------
 * @description 비밀번호 찾기
 */
export async function findBypassword(form) {
  try {
    return await api.post('/auth/password', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
