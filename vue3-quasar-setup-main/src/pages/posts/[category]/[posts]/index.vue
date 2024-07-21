<template>
  <div>
    <q-card>
      <q-card-section>
        <router-link
          :to="`/posts/${posts.categorySeq}`"
          class="q-ml-sm q-mb-md text-teal flex items-center decoration-none"
          style="margin: 0"
          >{{ posts.categoryNm }}
          <q-icon name="sym_o_chevron_right" size="18px"
        /></router-link>

        <p class="text-h5 q-pl-sm text-weight-bold">{{ posts.title }}</p>

        <div class="row">
          <UserProfile :user="posts" class="col-12 col-sm-7">
            <template #caption>
              <div>
                <span class="text-grey-14 text-caption q-mr-sm">{{
                  posts.createdAt
                }}</span>
                <span class="text-grey-14 text-caption"
                  >조회 {{ posts.readCount }}</span
                >
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
                    <q-item clickable>
                      <q-item-section>
                        <q-item-label>수정</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable>
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
          <div class="q-my-auto q-mr-md flex items-center">
            <!-- 좋아요 테이블 설계 후 좋아요 여부에 따라 이모지 변경 -->
            <q-icon name="sym_o_favorite" color="red" />
            <!-- <q-icon name="favorite" color="red" /> -->
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
    </q-card>
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

const { execute } = useAsyncState(() => getPostsDetail(route.params), null, {
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
</script>

<style scoped>
#viewer-wrap {
  min-height: 200px;
}
</style>
