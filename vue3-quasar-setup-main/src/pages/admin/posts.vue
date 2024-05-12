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
          @click="deleteHandler(selected)"
        />
        <q-btn
          @click="isDialog = true"
          label="등록"
          color="teal"
          outline
          :ripple="false"
        />
      </div>

      <!-- table -->
      <BaseCheckedTable
        v-model:selected="selected"
        :columns="postsColumns"
        :rows
        rowKey="seq"
        label="등록된 공지사항이 없습니다."
        :event="openDetailView"
      />
    </q-card-section>

    <!-- pagenation -->
    <q-card-section>
      <BasePagination
        v-if="rows.length"
        v-model:page="page"
        @update:model-value="executeSelectNoticeList(0, page.value)"
      />
    </q-card-section>

    <q-card-section>
      <q-form>
        <div class="row q-col-gutter-x-lg">
          <q-select
            v-model="page.option"
            :options="postSerchOptions"
            emit-value
            map-options
            dense
            outlined
            class="col-12 col-md-3"
          />
          <q-select
            v-if="page.option == 'upperSeq'"
            v-model="page.value"
            :options="category.parent"
            emit-value
            map-options
            dense
            outlined
            class="col-7 col-md-7"
          />
          <q-input
            v-if="page.option == 'title'"
            v-model="page.value"
            dense
            outlined
            class="col-7 col-md-7"
          />
          <q-select
            v-if="page.option == 'useYn'"
            v-model="page.value"
            :options="useYn"
            emit-value
            map-options
            dense
            outlined
            class="col-7 col-md-7"
          />
          <q-btn label="검색" class="col-3 col-md-2" unelevated />
        </div>
      </q-form>
    </q-card-section>
  </q-card>

  <!-- dialog -->
  <PostsDialog
    v-model="isDialog"
    v-model:form="form"
    @update:isDialog="closeTemplage"
    @delete:notice="deleteHandler(form)"
  />
  {{ page }}
</template>

<script setup>
import { useAsyncState } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';
// options
import { postsColumns, postSerchOptions, useYn } from './options/index';

const systemStore = useSystemStore();
const { category, isCategory } = storeToRefs(systemStore);

const isDialog = ref(false);
// 삭제 목록
const selected = ref([]);
// default value
const page = ref({
  min: 1,
  current: 1,
  max: 1,
  maxPages: 1,
  option: 'title',
  value: '',
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
// ----------------------------------------------------------------
// table row 클릭 시 상세 데이터 호출
const openDetailView = ({ row }) => {
  isDialog.value = true;
  executeSelectOneNotice(0, row);
};
const { execute: executeSelectOneNotice } = useAsyncState(selectOne, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    if (res?.status == 200) {
      form.value = { ...res.data.list };
    }
  },
});
// ----------------------------------------------------------------
// dialog 닫기
const closeTemplage = (state) => {
  isDialog.value = false;

  // 등록, 수정 시 데이터 호출, 아이콘 클릭 시 호출 x
  if (state) executeSelectNoticeList(0, {});
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
// ----------------------------------------------------------------
// 페이지 진입 시 list data 호출
const { execute: executeSelectNoticeList } = useAsyncState(
  () => getNoticeList(page.value),
  null,
  {
    immediate: true,
    throwError: true,
    onSuccess: (res) => {
      if (res?.status == 200) {
        const { list } = res.data;
        rows.value = list.notice;
        page.value = list.page;
      }
    },
  },
);
// ----------------------------------------------------------------
// template 삭제
const { execute: executeDeleteNotice } = useAsyncState(deleteNotice, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    if (res?.status == 200) {
      baseNotify(res.data.message);
      // postDialog에서 올라온 emit일 경우 dialog close
      if (isDialog.value) isDialog.value = false;
      // page 초기회
      page.value = {
        min: 1,
        current: 1,
        max: 1,
      };
      // 데이터 호출
      executeSelectNoticeList();
    }
  },
});

const deleteHandler = async (data) => {
  if (Object.keys(data).length) await executeDeleteNotice(0, data);
};
</script>
<style></style>
