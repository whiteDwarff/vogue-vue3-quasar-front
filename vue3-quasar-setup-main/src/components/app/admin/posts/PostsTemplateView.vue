<template>
  <q-card>
    <q-card-section>
      <div class="flex items-center q-mb-lg">
        <span class="block text-h6">게시판 관리</span>
        <q-space />
        <AdminBtnGroup
          @delete="deleteHandler(selected)"
          @add="isDialog = true"
          @refresh="refreshTemplateView"
        />
      </div>
      <!-- tableㅎ -->
      <BaseCheckedTable
        v-model:selected="selected"
        :columns="postsColumns"
        :rows
        rowKey="seq"
        label="등록된 템플릿이 없습니다."
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
        <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
          <q-select
            v-model="page.option"
            @update:model-value="page.value = ''"
            :options="postSerchOptions"
            emit-value
            map-options
            dense
            outlined
            class="col-12 col-md-3"
          />
          <!-- 이하 하위 옵션 -->
          <q-select
            v-if="page.option == 'upperSeq'"
            v-model="page.value"
            @update:model-value="executeSearch()"
            :options="category.parent"
            emit-value
            map-options
            dense
            outlined
            class="col-8 col-md-7"
          >
            <template v-if="!page.value" #selected>
              <span class="text-grey-7">카테고리를 선택하세요.</span>
            </template>
          </q-select>

          <q-input
            v-if="page.option == 'title'"
            v-model="page.value"
            @keyup.enter="executeSearch()"
            dense
            outlined
            class="col-8 col-md-7"
            placeholder="구분명을 입력하세요."
          />

          <q-select
            v-if="page.option == 'useYn'"
            v-model="page.value"
            @update:model-value="executeSearch()"
            :options="useYn"
            emit-value
            map-options
            dense
            outlined
            class="col-8 col-md-7"
          >
            <template v-if="!page.value" #selected>
              <span class="text-grey-7">사용여부를 선택하세요.</span>
            </template>
          </q-select>

          <div class="col-4 col-md-2">
            <q-btn
              @click="executeSearch"
              label="검색"
              outline
              unelevated
              color="teal"
              :ripple="false"
              style="width: 100%; height: 100%"
            />
          </div>
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
</template>

<script>
// page는 초기화가 자주됨, 함수로 리턴되는 오브젝트를 사용
const initializePageValue = () => {
  return {
    min: 1,
    current: 1,
    max: 1,
    maxPages: 10,
    option: 'title',
    value: '',
  };
};
</script>
<script setup>
import { useAsyncState } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';
// options
import {
  postsColumns,
  postSerchOptions,
  useYn,
} from 'src/pages/admin/options/index';

const systemStore = useSystemStore();
const { category, isCategory } = storeToRefs(systemStore);

const isDialog = ref(false);
// 삭제 목록
const selected = ref([]);
// 초기값
const page = ref(initializePageValue());
// page의 current, offset 초기화용 상태변수
const isFlag = ref(false);

// table data
const rows = ref([]);

const form = ref({
  title: '',
  upperSeq: null,
  lowerSeq: null,
  useYn: 'Y',
  prependYn: 'N',
  prepend: [],
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
      form.value = { ...res.data.list.form };
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
    prependYn: 'N',
    prepend: [],
    notice: '',
    template: '',
  };
};
// ----------------------------------------------------------------
// 페이지 진입 시 list data 호출
const { execute: executeSelectNoticeList } = useAsyncState(
  () => getNoticeList(page.value, isFlag.value),
  null,
  {
    immediate: true,
    throwError: true,
    onSuccess: (res) => {
      if (res?.status == 200) {
        const { list } = res.data;
        rows.value = list.notice;
        page.value = {
          ...list.page,
          option: page.value.option,
          value: page.value.value,
        };

        isFlag.value = false;
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
      // page 초기화
      page.value = initializePageValue();
      // 데이터 호출
      executeSelectNoticeList();
    }
  },
});

const deleteHandler = async (data) => {
  if (Object.keys(data).length) {
    baseNotify(
      '템플릿을 삭제하시겠습니까?',
      null,
      () => {
        executeDeleteNotice(0, data);
      },
      true,
    );
  } else {
    baseNotify('선택된 항목이 없습니다.');
  }
};
// ----------------------------------------------------------------
// template view 초기화 (검색)
const refreshTemplateView = () => {
  page.value = initializePageValue();
  executeSelectNoticeList(0, page.value);
};

const executeSearch = () => {
  isFlag.value = true;
  executeSelectNoticeList(0, page.value);
};
</script>
