<template>
  <q-table
    v-model:selected="selected"
    selection="multiple"
    flat
    bordered
    :row-key="rowKey"
    :columns
    :rows
    hide-selected-banner
    hide-pagination
    :no-data-label="label"
  >
    <!-- slot -->
    <template v-slot:body="props">
      <q-tr :props="props" @click="event(props)" class="cursor-pointer">
        <q-td>
          <q-checkbox v-model="selected" :val="props.row"></q-checkbox>
        </q-td>

        <!-- columns와 rows mapping -->
        <template v-for="column of columns" :key="column.name">
          <template v-for="(value, key, i) of props.row" :key="i">
            <q-td
              v-if="key != rowKey && column.name == key"
              :key="key"
              :props="props"
            >
              {{ value }}
            </q-td>
          </template>
        </template>
      </q-tr>
    </template>
    <!-- slot end -->
  </q-table>
</template>

<script setup>
const selected = defineModel('selected');
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: '등록된 데이터가 없습니다.',
  },
  event: {
    type: Function,
  },
  rowKey: [String, Number],
});
</script>

<style lang="scss" scoped></style>
<!-- 


	# selection="multiple"
		- checkbox 표시
-->

<!-- 
@TODO:
	- q-table 참고용 body slot,
	- 공식문서에는 하단 코드로 body slot 사용

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
-->
