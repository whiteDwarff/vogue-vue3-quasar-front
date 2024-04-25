/**
 * @param none
 * @return { promise } 모든 카테고리 및 사용자 권한 가져오기
 * -------------------------------------------------------------------
 * @description
 */
export async function getCategory() {
  console.log('요청');
  try {
    return await api.get('/admin/category/get');
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param form
 * @return { promise } 카테고리 등록
 * -------------------------------------------------------------------
 * @description
 */
export async function insertCategory(form) {
  try {
    return await api.post('/admin/category/insert', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
