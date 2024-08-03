<template>
  <div>
    <q-card>
      <q-card-section>
        <router-link
          :to="`/posts/${posts.categorySeq}`"
          class="q-ml-sm text-teal decoration-none"
          >{{ posts.categoryNm }}
          <q-icon name="sym_o_chevron_right" size="18px"
        /></router-link>

        <p class="text-h5 q-pl-sm q-pt-sm text-weight-bold">
          {{ posts.title }}
        </p>

        <div class="row">
          <UserProfile :user="posts" div="등록일" class="col-12 col-sm-7">
            <template #caption>
              <div>
                <span class="text-caption">조회 {{ posts.readCount }}</span>
              </div>
            </template>
          </UserProfile>

          <div class="flex items-center justify-end col-12 col-sm-5">
            <div class="q-mr-md">
              <q-icon name="sym_o_forum" />
              <span class="q-mx-xs">댓글</span>
              <span class="text-weight-bold">44</span>
            </div>
            <q-btn flat dense :ripple="false" class="text-weight-regular"
              >URL 복사</q-btn
            >
            <!-- 현재 게시글의 작성자와 로그인 사용자가 동일하다면 렌더링 -->
            <template v-if="posts.authorSeq == user.seq">
              <q-btn
                rounded
                flat
                dense
                icon="sym_o_more_vert"
                size="sm"
                :ripple="false"
                text-color="grey-14"
              >
                <q-menu>
                  <q-list dense>
                    <q-item clickable @click="editPost">
                      <q-item-section>
                        <q-item-label>수정</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="fetchedDelete">
                      <q-item-section>
                        <q-item-label class="text-red">삭제</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </template>
          </div>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section id="viewer-wrap">
        <TiptabViewer :content="posts.content" :bordered="false" />
      </q-card-section>

      <q-card-section>
        <div class="flex items-center">
          <div
            class="q-my-auto q-mr-md flex items-center cursor-pointer"
            @click="toggleLiked"
          >
            <!-- 좋아요 테이블 설계 후 좋아요 여부에 따라 이모지 변경 -->
            <q-icon v-if="posts?.isLiked" name="favorite" color="red" />
            <q-icon v-else name="sym_o_favorite" color="red" />
            <span class="q-mx-xs">좋아요</span>
            <span class="text-weight-bold"> {{ posts.likeCount }}</span>
          </div>
          <div class="q-ml-md">
            <q-icon name="sym_o_forum" />
            <span class="q-mx-xs">댓글</span>
            <span class="text-weight-bold">44</span>
          </div>
        </div>
      </q-card-section>

      <!-- 댓글 영역, commentYn에 따라 활성화 -->
      <q-card-section>
        <CommentWriteForm :commentYn="posts.commentYn" />
      </q-card-section>
    </q-card>
    <!-- isLoading이 true인 경우 body로 teleport -->
    <TeleportSpinner v-model="isLoading" />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/authStore';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const router = useRouter();
const route = useRoute();

const posts = ref({});
// ---------------------------------------------------------------------------
// 상세 데이터 호출
const obj = {
  postSeq: parseInt(route.params.posts),
  categorySeq: parseInt(route.params.category),
  userSeq: user.value.seq,
};

const { isLoading, execute } = useAsyncState(() => getPostsDetail(obj), null, {
  immediate: true,
  throwError: true,
  onSuccess: ({ data }) => {
    if (data.status == 'OK') posts.value = data;
    // route.param.posts에 일치하는 게시글이 없다면 해당 카테고리로 리다이렉트
    else {
      router.push(`/posts/${route.params.category}`);
      baseNotify('존재하지 않는 게시글입니다.', {
        type: 'warning',
      });
    }
  },
});
// ---------------------------------------------------------------------------
// 게시글 수정
const editPost = async () => {
  await baseNotify(
    '게시글을 수정하시겠습니까?',
    null,
    () => router.push(`/posts/add?seq=${posts.value.postSeq}`),
    true,
  );
};
// ---------------------------------------------------------------------------
// 게시글 삭제
const fetchedDelete = async () => {
  await baseNotify(
    '게시글을 삭제하시겠습니까?',
    null,
    () => deleteByPost(),
    true,
  );
};
// 게시글 삭제 서비스 로직
const deleteByPost = async () => {
  isLoading.value = true;
  try {
    const { data } = await api.post('/posts/delete', posts.value);
    if (data.status == 'OK') {
      isLoading.value = false;
      baseNotify('게시글이 삭제되었습니다.');
      router.push(`/posts/${posts.value.categorySeq}`);
    } else {
      baseNotify('게시글 삭제에 실패하였습니다.', {
        type: 'warning',
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// ---------------------------------------------------------------------------
// 좋아요 상태 업데이트
const toggleLiked = async () => {
  // 사용자가 로그인 상태가 아니라면 함수 종료
  if (!user.value.seq) return;

  let obj = {
    postSeq: parseInt(route.params.posts),
    userSeq: user.value.seq,
  };
  try {
    const { data } = await api.post('/posts/toggleLiked', obj);
    if (data.status == 'OK') {
      // 좋아요 상태 업데이트
      posts.value.isLiked = data.result;
      // 좋아요 개수 증감
      if (data.result) posts.value.likeCount += 1;
      else if (!data.result && posts.value.likeCount > 0)
        posts.value.likeCount -= 1;
    }
  } catch (err) {
    console.log(err);
    baseNotify('네트워크 통신이 원활하지 않습니다.');
  }
};
</script>

<style scoped>
#viewer-wrap {
  min-height: 200px;
}
</style>
