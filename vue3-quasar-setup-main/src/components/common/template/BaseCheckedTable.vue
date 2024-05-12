<template>
  <!--
			Quasar <q-table>
			DOC : https://quasar.dev/vue-components/table#responsive-tables

      - selected : rows의 checked box 선택시 데이터가 담기는 배열 ** required **

      - columns : table header td

      - rows    : axios로 호출된 데이터 

      - no-data-label : rows의 length가 0일 경우 나오는 text

      - selection : 
          • multiple : 다중선택
          • single   : 하나만 선택

      - flat : <q-table>의 상/하 padding 최소화

      - bordered : table border 생성

      - hide-selected-banner  : <q-table>에서 기본으로 제공하는  selected 숨김
        
      - hide-pagination       : <q-table>에서 기본으로 제공하는 pagination 숨김
		-->

  <q-table
    v-model:selected="selected"
    :row-key="rowKey"
    :columns
    :rows
    :no-data-label="label"
    selection="multiple"
    flat
    bordered
    hide-selected-banner
    hide-pagination
  >
    <!-- 
      - table row를 클릭하여 데이터를 호출하는 이벤트를 발생시키려면 slot을 사용하여 데이터를 랜더링 시켜야함 !!!
      - event props 필수 **
   -->
    <template v-slot:body="props">
      <q-tr :props="props" @click="event(props)" class="cursor-pointer">
        <q-td>
          <q-checkbox
            v-model="props.selected"
            :val="props.row"
            :false-value="false"
          />
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
  </q-table>
</template>

<script setup>
import { computed } from 'vue';

const selected = defineModel('selected');
const props = defineProps({
  // table header
  columns: {
    type: Array,
    default: () => [],
  },
  // table row
  rows: {
    type: Array,
    default: () => [],
  },
  // empty data label
  label: {
    type: String,
    default: '등록된 데이터가 없습니다.',
  },
  // axios call function
  event: {
    type: Function,
  },
  // primary key
  rowKey: [String, Number],
});
</script>
