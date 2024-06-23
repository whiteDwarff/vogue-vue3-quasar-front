/**
 * @param none
 * @return { promise } 카테고리, 사용자 권한 등..
 * -------------------------------------------------------------------
 * @description
 */
export async function getSystemAll({ idntfCd }) {
  console.log('CD : ' + idntfCd);
  try {
    return await api.POST(`/system/getSystemAll?idntfCd=${idntfCd}`);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
