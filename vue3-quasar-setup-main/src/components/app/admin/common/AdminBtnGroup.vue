<template>
  <!--
		상위 컴포넌트 이벤트 정의

		@refresh="FUNCTION"
		@delete="FUNCTION"
		@add="FUNCTION"
		
	-->
  <q-btn-group unelevated>
    <q-btn
      @click="$emit('refresh')"
      icon="refresh"
      color="grey-8"
      outline
      flat
      :ripple="false"
    >
      <q-tooltip> 초기화 </q-tooltip>
    </q-btn>
    <q-btn
      @click="$emit('delete')"
      icon="sym_o_delete"
      color="red"
      outline
      flat
      :ripple="false"
    >
      <q-tooltip> 삭제 </q-tooltip>
    </q-btn>
    <q-btn
      @click="$emit('add')"
      icon="add"
      color="teal"
      outline
      flat
      :ripple="false"
    >
      <q-tooltip> 등록 </q-tooltip>
    </q-btn>
  </q-btn-group>
</template>

<script setup>
defineEmits(['refresh', 'delete', 'add']);
</script>

<!--

	백업용

  <q-btn-group unelevated>
		<q-btn icon="refresh" color="grey-8" outline flat :ripple="false">
			<q-tooltip> 초기화 </q-tooltip>
		</q-btn>
		<q-btn
			icon="sym_o_delete"
			color="red"
			outline
			flat
			:ripple="false"
			@click="deleteHandler(selected)"
		>
			<q-tooltip> 삭제 </q-tooltip>
		</q-btn>
		<q-btn
			@click="isDialog = true"
			icon="add"
			color="teal"
			outline
			flat
			:ripple="false"
		>
			<q-tooltip> 등록 </q-tooltip>
		</q-btn>
	</q-btn-group> 




-->
