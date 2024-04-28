<template>
  <q-card>
    <q-card-section>
      <span>공지사항 관리</span>
      <q-separator />
      <q-table
        v-model:selected="selected"
        :columns
        :rows
        row-key="seq"
        selection="multiple"
        flat
        bordered
        hide-pagination
      >
        <!-- https://quasar.dev/vue-components/table#responsive-tables -->
        <div class="row justify-center q-mt-md">
          <q-pagination color="primary" size="sm" />
        </div>
      </q-table>
    </q-card-section>
    {{ selected }}
  </q-card>
</template>

<script setup>
// checkbox 선택
const selected = ref([]);

const columns = [
  {
    name: 'content',
    label: '내용',
    field: 'content',
    style: 'width: 85%',
    align: 'left',
  },
  {
    name: 'useYn',
    label: '사용여부',
    field: 'useYn',
    style: 'width: 5%',
    align: 'center',
    format: (val, row) => {
      return `${val}!!`;
    },
  },
  {
    name: 'createdAt',
    label: '작성일',
    align: 'center',
    field: 'createdAt',
    style: 'width: 10%',
    sortable: true,
  },
];

const rows = ref([
  {
    seq: 1,
    content: '내용1',
    useYn: 'Y',
    createdAt: '2024-04-28',
  },
  {
    seq: 2,
    content: '내용2',
    useYn: 'N',
    createdAt: '2024-04-29',
  },
]);
</script>

<style lang="scss" scoped></style>
