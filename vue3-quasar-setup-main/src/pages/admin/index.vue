<template>
  <div>
    <q-card>
      <q-card-section>
        <q-tabs
          v-model="tab"
          dense
          active-color="teal"
          indicator-color="teal"
          align="justify"
          narrow-indicator
        >
          <q-tab name="list" label="사용자별 권한 목록" :ripple="false" />
          <q-tab name="form" label="등록 • 수정" :ripple="false" />
        </q-tabs>
      </q-card-section>

      <!-- panels -->
      <q-tab-panels v-model="tab" animated>
        <!-- list -->
        <q-tab-panel name="list">
          <q-table
            v-model:selected="selected"
            selection="single"
            :rows="rows"
            :columns="columns"
            row-key="author_code"
            hide-pagination
            flat
            @row-click="console.log(evt, row)"
          />

          <q-separator />

          <q-card-action class="q-mt-lg flex">
            <q-space />
            <q-btn label="수정" flat color="teal" unelevated :ripple="false" />
            <q-btn label="삭제" flat color="red" unelevated :ripple="false" />
          </q-card-action>
        </q-tab-panel>
        <!-- form -->
        <q-tab-panel name="form">
          <q-form class="q-pa-lg">
            <q-input label="권한그룹코드" :autofocus="true" />
            <q-input label="권한그룹명" />
            <q-input label="설명" type="textarea" />
            <q-input label="정렬" />
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    {{ selected }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tab = ref('list');
const selected = ref([]);

const columns = ref([
  {
    name: 'author_code',
    align: 'center',
    label: '권한그룹코드',
    field: 'author_code',
    style: 'width: 25%',
    field: (row) => row.author_code,
  },
  {
    name: 'author_nm',
    align: 'center',
    label: '권한그룹명',
    field: 'author_nm',
    style: 'width: 25%',
  },
  {
    name: 'sort',
    align: 'center',
    label: '정렬',
    field: 'sort',
    sortable: true,
    style: 'width: 25%',
  },
  {
    name: 'created_at',
    align: 'center',
    label: '생성일',
    field: 'created_at',
    sortable: true,
    style: 'width: 25%',
  },
]);

const rows = ref([
  {
    author_code: 'ROLE_ANONYMOUS',
    author_nm: 'ANONYMOUS',
    sort: 50,
    created_at: '2024-03-21',
  },
  {
    author_code: 'ROLE_SYS',
    author_nm: '시스템관리자',
    sort: 40,
    created_at: '2024-03-23',
  },
  {
    author_code: 'ROLE_ADMIN',
    author_nm: '사이트관리자',
    sort: 30,
    created_at: '2024-02-13',
  },
]);
</script>

<style lang="scss" scoped></style>
<!-- 
	<q-table
			selection="single"					  : table에 체크박스 생성
			v-model:selected="selected"		: 체크박스를 선택한 요소를 담고 있는 반응형 변수
			:columns="columns"					  : th, 테이블의 헤더
			:rows="rows"								  : td, 테이블의 데이터
			row-key="author_code"
			hide-pagination								: paginataion 숨김
			flat												  : 그림자 제거
	/>
-->
