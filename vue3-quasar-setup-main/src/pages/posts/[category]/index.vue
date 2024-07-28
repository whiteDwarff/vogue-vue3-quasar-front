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
          @update:model-value="getTableRow"
        />
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
          <q-select
            v-model="option.label"
            @update:model-value="getTableRow"
            :options="searchOption"
            emit-value
            map-options
            dense
            outlined
            class="col-12 col-md-3"
          />
          <q-input
            v-model="option.value"
            @keyup.enter="getTableRow"
            class="col-8 col-md-7"
            dense
            outlined
          />
          <div class="col-4 col-md-2">
            <q-btn
              @click="getTableRow"
              label="검색"
              dense
              outline
              unelevated
              color="teal"
              :ripple="false"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- isLoading이 true인 경우 body로 teleport -->
    <TeleportSpinner v-model="isLoading" />
  </div>
</template>

<script>
const initializePageValue = (category) => {
  return {
    current: 1,
    category,
  };
};
</script>
<script setup>
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';

import { columns } from '../../posts/options.js';
import { selectOne } from 'src/service/admin/postsService.js';
import { searchOption } from '../options.js';

const systemStore = useSystemStore();

const route = useRoute();
const router = useRouter();

// paging options
const page = ref(initializePageValue(route.params.category));
// search options
const option = ref({
  label: route.query?.label || searchOption[0].value,
  value: route.query?.value || '',
});
// table row
const rows = ref([]);

// ------------------------------------------------------------------
// 게시판이 바뀔 때 해당 게시판에 맞는 데이터 요청
watch(
  () => route.params.category,
  (newValue, oldValue) => {
    page.value = { ...initializePageValue(newValue) };
    option.value.label = '';
    option.value.value = '';
    // systemStore.updateLoadingState();
    executeSelectByPaging(0, page.value);
  },
);

// 검색조건과 페이지네이션 적용
const getTableRow = async () => {
  if (option.value.label)
    router.push({
      query: {
        ...router.query,
        ...option.value,
      },
    });
  if (page.value.current > 1)
    router.push({
      query: {
        ...router.query,
        current: page.value.current,
      },
    });
  // systemStore.updateLoadingState();
  await executeSelectByPaging(0, {
    ...page.value,
    ...option.value,
  });
};

const { isLoading, execute: executeSelectByPaging } = useAsyncState(
  () =>
    selectByPaging({
      ...page.value,
      ...option.value,
    }),
  null,
  {
    immediate: true,
    throwError: true,
    onSuccess: ({ data }) => {
      if (data.status == 'OK') {
        // systemStore.updateLoadingState();
        page.value = {
          ...data.page,
          ...route.params,
        };
        rows.value = data.list;
      }
    },
  },
);

// ------------------------------------------------------------------
const clickTableRow = async ({ row }) => {
  router.push(`/posts/${row.lowerseq}/${row.seq}`);
};
</script>
