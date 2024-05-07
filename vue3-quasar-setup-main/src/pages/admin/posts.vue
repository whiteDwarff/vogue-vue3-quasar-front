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
        :event="addTemplate"
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
    style: 'width: 10%%',
  },
  {
    name: 'useYn',
    label: '사용여부',
    field: 'useYn',
    align: 'center',
    style: 'width: 10%%',
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
const { category } = storeToRefs(systemStore);

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
  upperSeq: 0,
  lowerSeq: 0,
  useYn: 'Y',
  content: '',
});

const addTemplate = () => {
  isDialog.value = true;
};

const closeTemplage = () => {
  isDialog.value = false;
  execute(0, {});
};

/**
 * TODO: pinia에 상태관리 변수로 관리
 */
watch(systemStore.setUpperSeq, (newValue) => {
  form.value.upperSeq = newValue;
  form.value.lowerSeq = systemStore.setLowerCategory(newValue)[0].value;
});

const { execute } = useAsyncState(() => getNoticeList(page.value), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    console.log(res.data);
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
