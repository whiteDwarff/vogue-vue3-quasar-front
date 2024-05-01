<template>
  <q-card>
    <q-card-section>
      <div class="flex items-center q-mb-lg">
        {{ category }}
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
        id="template-card"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="changeDialog(props)">
            <q-td>
              <q-checkbox v-model="selected" :val="props.row"></q-checkbox>
            </q-td>
            <q-td key="content" :props="props" class="cursor-pointer">
              {{ props.row.content }}
            </q-td>
            <q-td key="category" :props="props">
              {{ props.row.category }}
            </q-td>
            <q-td key="useYn" :props="props">
              {{ props.row.useYn }}
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
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
  <PostsDialog v-model="isDialog" :category="system.category" />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';
import { onMounted } from 'vue';

const systemStore = useSystemStore();
const { system, category } = storeToRefs(systemStore);

const isDialog = ref(false);
const selected = ref([]);
const page = ref({
  min: 1,
  current: 1,
  max: 10,
});

const addTemplate = () => {
  isDialog.value = true;
};

const changeDialog = ({ row }) => {
  console.log(row);
  isDialog.value = true;
};
const columns = [
  {
    name: 'content',
    label: '구분',
    field: 'content',
  },
  {
    name: 'category',
    label: '카테고리',
    field: 'category',
  },
  {
    name: 'useYn',
    label: '사용여부',
    field: 'useYn',
  },
  {
    name: 'createdAt',
    label: '작성일',
    field: 'createdAt',
  },
];

const rows = ref([
  {
    seq: 1,
    content: '내용1',
    category: '카테고리1',
    useYn: 'Y',
    createdAt: '2024-04-28',
  },
  {
    seq: 2,
    content: '내용2',
    category: '카테고리2',
    useYn: 'N',
    createdAt: '2024-04-29',
  },
  {
    seq: 3,
    content: '내용3',
    category: '카테고리3',
    useYn: 'N',
    createdAt: '2024-04-30',
  },
  {
    seq: 4,
    content: '내용4',
    category: '카테고리4',
    useYn: 'N',
    createdAt: '2024-04-31',
  },
  {
    seq: 5,
    content: '내용5',
    category: '카테고리5',
    useYn: 'N',
    createdAt: '2024-05-01',
  },
]);
</script>

<style>
th {
  text-align: center;
}
</style>
