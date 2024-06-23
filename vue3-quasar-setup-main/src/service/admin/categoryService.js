/**
 * @param none
 * @return { promise } 모든 카테고리 및 사용자 권한 가져오기
 * -------------------------------------------------------------------
 * @description
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
 * @return { promise } 카테고리 등록
 * -------------------------------------------------------------------
 * @description form의 seq값의 존재 여부에 따라 등록 및 수정
 */
export async function saveCategory(form) {
  try {
    // id가 없다면 insert
    if (!form.seq) return await api.post('/admin/category/insert', form);
    // id가 있다면 update
    return await api.patch('/admin/category/update', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param form
 * @return { promise } 클릭한 카테고리 상세 조회
 * -------------------------------------------------------------------
 * @description CategoryList에서 클릭한 카테고리의 상세 데이터를 받아온다.
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
 * @return { promise } 카테고리 + 권한 삭제
 * -------------------------------------------------------------------
 * @description
 */
export async function deleteCategory({ seq }) {
  try {
    return await api.delete(`/admin/category/delete?seq=${seq}`);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
