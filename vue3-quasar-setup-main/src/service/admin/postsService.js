/**
 * @param
 * @return { promise }
 * -------------------------------------------------------------------
 * @description
 */
export async function getNoticeList(page) {
  console.log('-----------------');
  console.log(page);
  console.log('-----------------');
  try {
    return await api.post('/admin/posts/get', page);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param form
 * @return { promise } 모든 카테고리 및 사용자 권한 가져오기
 * -------------------------------------------------------------------
 * @description 공지사항 등록 및 수정
 */
export async function saveNotice(form) {
  try {
    return await api.post('/admin/posts/insertNotice', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
