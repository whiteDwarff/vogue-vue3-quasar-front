<template>
  <div class="row justify-center">
    <!--
			Quasar <q-pagination>
			DOC : https://quasar.dev/vue-components/pagination#qpagination-api

			- q-pagination의 update-modelValue가 event가 발생하면 호출한 컴포넌트에도 event를 올려준다. ( 데이터 호출 )
			- @update-modelValue="FUNCTION()"
			- required : page (v-model:page="VALUE") **
			- 데이터가 있을때만 랜더링 시키려면 상위 컴포넌트에서 v-if="rows.length" 추가
		-->
    <q-pagination
      v-model="page.current"
      :min="page.min"
      :max="page.max"
      :max-pages="page.maxPages"
      :boundary-numbers="false"
      :ellipses="false"
      @update:model-value="$emit('update:modelValue')"
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
</template>

<script setup>
const page = defineModel('page');
const emit = defineEmits(['update:modelValue']);
</script>
