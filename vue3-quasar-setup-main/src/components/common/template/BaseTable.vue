<template>
  <q-table
    v-model:selected="selected"
    :row-key="rowKey"
    :columns
    :rows
    :selection
    :no-data-label="label"
    :rows-per-page-options="[0]"
    :table-header-class="headerClass"
    flat
    bordered
    hide-selected-banner
    hide-pagination
    id="base-table"
  >
    <!-- 
      - table row를 클릭하여 데이터를 호출하는 이벤트를 발생시키려면 slot을 사용하여 데이터를 랜더링 시켜야함 !!!
      - event props 필수 **
    -->
    <template v-slot:body="props">
      <q-tr :props="props" @click="event(props)" class="cursor-pointer">
        <q-td v-if="checked">
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
  // checked 여부에 따라 computed를 통해 checkbox 생성
  checked: {
    type: Boolean,
    default: false,
  },
  // table header class
  headerClass: {
    type: String,
    default: 'bg-grey-1',
  },
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

const selection = computed(() => (props.checked ? 'multiple' : 'none'));
</script>

<style>
/* div.q-checkbox__bg.absolute {
  background-color: none;
} */
#base-table th {
  font-weight: bold !important;
}
</style>
<!--
			Quasar <q-table>
			DOC : https://quasar.dev/vue-components/table#responsive-tables
            https://dev.to/quasar/quasar-s-qtable-the-ultimate-component-5-6-styling-everything-4l62

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

      - rows-per-page-options : 페이지당 표시할 데이터 제한 x

      - table-header-class    : th에 바인딩 될 클레스

      - table-header-style    : th에 바인딩 될 스타일



    ------------------------------------------------------------------

    option

    {
      name: 'createdAt',
      label: '작성일',
      field: 'createdAt',
      align: 'center',
      style: 'width: 10%',
      sortable: true,
    },

    - sortable : 데이터  정렬
        - sortable을 사용하려면 해당 객체에 'field' 속성이 필수

		-->
