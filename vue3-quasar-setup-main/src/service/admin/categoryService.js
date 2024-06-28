/**
 * @param none
 * @return { promise }
 * -------------------------------------------------------------------
 * @description 모든 카테고리 및 사용자 권한 가져오기
 */
export async function getCategory() {
  try {
    return await api.get('/admin/category/get');
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param form
 * @return { promise }
 * -------------------------------------------------------------------
 * @description 카테고리 저장 및 수정
 */
export async function saveCategory(form) {
  try {
    return await api.post('/admin/category/save', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param form
 * @return { promise }
 * -------------------------------------------------------------------
 * @description 클릭한 카테고리 상세 조회
 */
export async function selectCategoryInfo(seq) {
  try {
    return await api.post('/admin/category/selectOne', { seq });
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param form
 * @return { promise }
 * -------------------------------------------------------------------
 * @description 카테고리, 권한, 템플릿 삭제
 */
export async function deleteCategory(data) {
  try {
    return await api.post('/admin/category/delete', data);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
