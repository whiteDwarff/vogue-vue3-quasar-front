<template>
  <div>
    <q-card class="row">
      <q-card-section class="col-12 col-md-4">
        <IndexList :permission @getAuthDetail="getAuthDetail($event)" />
        {{ permission }}
        <p>ddd</p>
      </q-card-section>

      <q-card-section class="col-12 col-md-8" bordered>
        <IndexDetail v-model="selected" :permission @getList="execute" />
      </q-card-section>
    </q-card>
    {{ selected }}
  </div>
</template>

<script setup>
import { useSystemStore } from 'src/stores/systemStore';
import { storeToRefs } from 'pinia';

const systemStore = useSystemStore();

const { permission } = storeToRefs(systemStore);

const tab = ref('list');
const selected = ref({});

const getAuthDetail = (e) => {
  selected.value = { ...systemStore.setAuthDetail(e) };
};

const { execute } = useAsyncState(() => getMenuList(user.value), null, {
  immediate: false,
  throwError: true,
  onSuccess: ({ data }) => {
    console.log(data);
    if (data.status == 'OK') systemStore.setSystem(data);
  },
});
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
