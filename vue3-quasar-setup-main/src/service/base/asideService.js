/**
 * @param { idntfCd }  사용자 권한
 * @return { promise } 서비스 메뉴 반환
 * -------------------------------------------------------------------
 * @description 사용자의 권한에 맞는 서비스 메뉴 가져오기
 */
export async function getMenuList({ idntfCd }) {
  console.log('CD : ' + idntfCd);
  try {
    return await api.post(`/system/get`, {
      idntfCd,
    });
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
