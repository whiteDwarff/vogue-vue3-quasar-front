<template>
  <q-card>
    <q-card-section>
      <div class="flex items-center q-mb-lg">
        <span class="block text-h6">템플릿 관리</span>
        <q-space />
        <q-btn
          label="삭제"
          color="red"
          outline
          :ripple="false"
          class="q-mx-md"
        />
        <q-btn
          @click="addTemplate"
          label="등록"
          color="teal"
          outline
          :ripple="false"
        />
      </div>
      <BaseTable
        v-model:selected="selected"
        :columns
        :rows
        rowKey="seq"
        label="등록된 공지사항이 없습니다."
        :event="openDetailView"
      ></BaseTable>
    </q-card-section>

    <!-- pagenation -->

    <q-card-section>
      <div class="row justify-center">
        <q-pagination
          v-if="rows.length"
          v-model="page.current"
          :min="page.min"
          :max="page.max"
          :max-pages="page.maxPages"
          :boundary-numbers="false"
          :ellipses="false"
          @update:model-value="execute(0, page.value)"
          color="grey"
          active-color="primary"
          rounded
          direction-links
          boundary-links
          icon-first="keyboard_double_arrow_left"
          icon-last="keyboard_double_arrow_right"
          flat
        />
      </div>
    </q-card-section>
  </q-card>
  <!-- dialog -->
  <PostsDialog
    v-model="isDialog"
    v-model:form="form"
    @update:isDialog="closeTemplage"
  />
</template>

<script>
const columns = [
  {
    name: 'content',
    label: '구분',
    field: 'content',
    align: 'left',
    style: 'width: 70%',
  },
  {
    name: 'category',
    label: '카테고리',
    field: 'category',
    align: 'center',
    style: 'width: 15%%',
  },
  {
    name: 'useYn',
    label: '사용여부',
    field: 'useYn',
    align: 'center',
    style: 'width: 5%',
  },
  {
    name: 'createdAt',
    label: '작성일',
    field: 'createdAt',
    align: 'center',
    style: 'width: 10%%',
  },
];
</script>

<script setup>
import { useAsyncState } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';
import { onMounted, watch } from 'vue';

const systemStore = useSystemStore();
const { category, isCategory } = storeToRefs(systemStore);

const isDialog = ref(false);
const selected = ref([]);
const page = ref({
  min: 1, // default value
  current: 1, // default value
  max: 1,
});

// table data
const rows = ref([]);
const form = ref({
  title: '',
  upperSeq: null,
  lowerSeq: null,
  useYn: 'Y',
  notice: '',
  template: '',
});

const addTemplate = () => (isDialog.value = true);

const openDetailView = ({ row }) => {
  isDialog.value = true;
  const a = { ...rows.value.filter((data) => data.seq == row.seq) };
  form.value = {
    ...a,
  };
  console.log(form.value);
};

const closeTemplage = () => {
  isDialog.value = false;
  // 데이터 호출
  execute(0, {});
  // form 초기화
  form.value = {
    title: '',
    upperSeq: null,
    lowerSeq: null,
    useYn: 'Y',
    notice: '',
    template: '',
  };
};
const { execute } = useAsyncState(() => getNoticeList(page.value), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    if (res?.status == 200) {
      const { list } = res.data;
      rows.value = list.notice;
      page.value = list.page;
    }
  },
});
</script>

<style>
th {
  text-align: center;
}
</style>
