<template>
  <div>
    <q-card>
      <q-card-section>
        <!-- table -->
        <BaseTable
          :rows
          :columns
          :event="clickTableRow"
          rowKey="seq"
          label="등록된 게시글이 없습니다."
        />
      </q-card-section>
      <!-- pagenation -->
      <q-card-section>
        <BasePagination
          v-if="rows.length"
          v-model:page="page"
          @update:model-value="executeSelectByPaging(0, page)"
        />
        <!-- @update:model-value="executeSelectByPaging(0, page)" -->
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
const initializePageValue = (option) => {
  return {
    min: 1,
    max: 1,
    current: 1,
    ...option,
  };
};
</script>
<script setup>
import { useAsyncState } from '@vueuse/core';
import { columns } from '../../posts/options.js';
import { selectOne } from 'src/service/admin/postsService.js';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const page = ref(initializePageValue(route.params));
// table row
const rows = ref([]);

// ------------------------------------------------------------------
// 게시판이 바뀔 때 해당 게시판에 맞는 데터 요청
watch(
  () => route.params.category,
  (newValue, oldValue) => {
    page.value = { ...initializePageValue({ category: newValue }) };
    executeSelectByPaging(page.value);
  },
);
const { execute: executeSelectByPaging } = useAsyncState(
  () => selectByPaging(page.value),
  null,
  {
    immediate: true,
    throwError: true,
    onSuccess: ({ data }) => {
      page.value = {
        ...data.page,
        ...route.params,
      };
      rows.value = data.list;
    },
  },
);
// ------------------------------------------------------------------
const clickTableRow = async ({ row }) => {
  router.push(`/posts/${row.lowerseq}/${row.seq}`);
};
/*
https://velog.io/@yiwonjin/vue-router3-state%EA%B0%9D%EC%B2%B4%EB%A1%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%82%AC%EC%9D%B4-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EB%8B%AC

const { execute: executeSelectOne } = useAsyncState(getPostsDetail, null, {
  immediate: false,
  throwError: true,
  onSuccess: (data) => {
    console.log(data);
  },
});
*/
</script>
