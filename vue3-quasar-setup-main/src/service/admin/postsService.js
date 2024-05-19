/**
 * @param none
 * @return { promise }
 * -------------------------------------------------------------------
 * @description 공지사항, 템플릿 데이터 조회
 */
export async function getNoticeList(page, isCurrentFlag) {
  if (isCurrentFlag) {
    page.current = 1;
    page.offset = 0;
  }
  try {
    return await api.post('/admin/posts/get', page);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param seq
 * @return { promise }
 * -------------------------------------------------------------------
 * @description 하나의 템플릿 데이터 조회
 */

export async function selectOne({ seq }) {
  try {
    return await api.get(`/admin/posts/selectOne/${seq}`);
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
    return await api.post('/admin/posts/saveNotice', form);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}

/**
 * @param data ( selected || form)
 * @return { promise } message
 * -------------------------------------------------------------------
 * @description 공지사항 삭제
 */
export async function deleteNotice(data) {
  let arr = [];
  if (Array.isArray(data)) {
    console.log('object');
    arr = data;
  } else arr[0] = data;

  try {
    return await api.post('/admin/posts/delete', arr);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
