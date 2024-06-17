/**
 * @param  { form, userId }
 * @return { promise }
 * -------------------------------------------------------------------
 * @description 게시글 저장 및 수정
 */
export async function savePosts(form, userId) {
  try {
    return await api.post('/posts/save', { ...form, author: userId });
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
/**
 * @param  { parmas }
 * @return { promise }
 * -------------------------------------------------------------------
 * @description 게시글 조회
 */
export async function getPostsDetail(params) {
  try {
    return await api.post('/posts/selectOne', params);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}
