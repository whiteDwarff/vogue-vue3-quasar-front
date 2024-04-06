/**
 * @param { string } email 이메일
 * @returns { boolean } 이메일이 유효성 검사를 통과하면 true 반환
 * @returns { string }  이메일이 유효성 검사에 통과히지 못하면 message 반환
 * -------------------------------------------------------------------
 * @description 이메일 유효성 검사 (local@domain.com)
 */
const validateEmail = (val) => {
  const reg =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return reg.test(val) || '이메일 형식이 아닙니다';
};
/**
 * @param { string } password 비밀번호
 * @returns { boolean } 비밀번호가 유효성 검사를 통과하면 true 반환
 * @returns { string }  비밀번호가 유효성 검사에 통과히지 못하면 message 반환
 * -------------------------------------------------------------------
 * @description 비밀번호 유효성 검사 (영문, 숫자, 특수기호 조합 8자리 이상 15자리 이하)
 */
const validatePassword = (val) => {
  const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return (
    reg.test(val) ||
    '비밀번호는 영문, 숫자, 특수기호 조합 8자리 이상 입력하세요'
  );
};
/**
 * @param { string } password 현재 비밀번호
 * @param { passwordConfirm } 비밀번호 확인 현재 비밀번호
 * @returns { boolean } 두 비밀번호가 같으면 true 반환
 * @returns { string } 두 비밀번호가 다르면 message 반환
 * -------------------------------------------------------------------
 * @description 회원가입, 회원정보 수정 시 비밀번호 확인
 */
const validatePasswordConfirm = (password, passwordConfirm) =>
  password === passwordConfirm || '비밀번호 값이 일치하지 않습니다';

export { validateEmail, validatePassword, validatePasswordConfirm };
