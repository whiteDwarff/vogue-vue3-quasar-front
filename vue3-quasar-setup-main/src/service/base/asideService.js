/**
 * @param { string } form 회원가입 정보
 * @return { promise } 201 status 반환
 * -------------------------------------------------------------------
 * @description 회원가입
 */
export async function getMenuList({ idntfCd }) {
  try {
    return await api.get(`/system/get?idntfCd=${idntfCd}`);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
