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
/**
 * @param  { params }
 * @return { promise }
 * -------------------------------------------------------------------
 * @description 게시글 목록 조회
 */
export async function selectByPaging(params) {
  console.log(params);
  try {
    return await api.post('/posts/selectByPaging', params);
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
}

export async function readImageURL(images) {
  try {
    if (images.length) {
      const form = new FormData();
      for (let i = 0; i < images.length; i++) form.append('images', images[i]);

      // TODO: url 파라미터로 받게 변경
      return await api.post('/posts/images', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}
