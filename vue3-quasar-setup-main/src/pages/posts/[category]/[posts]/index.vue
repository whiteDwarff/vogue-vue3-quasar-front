<template>
  <div>
    <q-card>
      <!-- <div>/posts/[id]/[id] , 92/6</div> -->
      <q-card-section>
        <router-link
          :to="`/posts/${posts.categorySeq}`"
          class="q-ml-sm q-mb-md text-teal flex items-center decoration-none"
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
import TiptabViewer from 'src/components/common/tiptab/TiptabViewer.vue';

const posts = ref({});
const { execute } = useAsyncState(
  () => getPostsDetail(useRoute().params),
  null,
  {
    immediate: true,
    throwError: true,
    onSuccess: ({ data }) => {
      console.log(data);
      posts.value = data;
    },
  },
);
</script>

<style scoped>
#viewer-wrap {
  min-height: 200px;
}
</style>
