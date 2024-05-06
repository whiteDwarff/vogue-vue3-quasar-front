<template>
  <q-card>
    <q-card-section>
      {{ selected }}
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
      <!-- 
      <q-table
        v-model:selected="selected"
        flat
        bordered
        row-key="seq"
        :columns
        :rows
        :selected="selected"
        selection="multiple"
        hide-selected-banner
        hide-pagination
        no-data-label="등록된 공지사항이 없습니다."
      >
        <template v-slot:body="props">
          <q-tr
            :props="props"
            @click="changeDialog(props)"
            class="cursor-pointer"
          >
            <q-td>
              <q-checkbox v-model="selected" :val="props.row"></q-checkbox>
            </q-td>

            <template v-for="column of columns" :key="column.name">
              <template v-for="(value, key, i) of props.row" :key="i">
                <q-td
                  v-if="key != 'seq' && column.name == key"
                  :key="key"
                  :props="props"
                >
                  {{ value }}
                </q-td>
              </template>
            </template>
          </q-tr>
        </template>
      </q-table> -->
    </q-card-section>

    <!-- pagenation -->
    <q-card-section>
      <div class="row justify-center">
        <q-pagination
          v-model="page.current"
          :min="page.min"
          :max="page.max"
          :max-pages="5"
          :boundary-numbers="false"
          :ellipses="false"
          @update:model-value="console.log($event)"
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
  <PostsDialog v-model="isDialog" v-model:form="form" />
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

const systemStore = useSystemStore();
const { category } = storeToRefs(systemStore);

const isDialog = ref(false);
const selected = ref([]);
const page = ref({
  min: 1,
  current: 1,
  max: 10,
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

const changeDialog = ({ row }) => {
  isDialog.value = true;
};

watch(systemStore.setUpperSeq, (newValue) => {
  form.value.upperSeq = newValue;
  form.value.lowerSeq = systemStore.setLowerCategory(newValue)[0].value;
});

const { execute } = useAsyncState(() => aaaaaaaa(), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    console.log(res);
    if (res.status == 200) {
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
