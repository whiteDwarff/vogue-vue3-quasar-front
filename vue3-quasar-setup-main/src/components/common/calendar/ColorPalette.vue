<template>
  <div class="q-gutter-x-sm flex items-center">
		<label>{{ label }}</label>
		<q-radio v-for="color of colors" :key="color.value"
			v-model="modelValue"
			keep-color
			:color="color.color"
			:val="color.value"
			size="xs"
			name="color"
		/>
	</div>
</template>
<script setup>
const props = defineProps(['label']);

const modelValue = defineModel();

const colors = [
  { color: 'red', value: 'red' },
  { color: 'orange', value: 'orange' },
  { color: 'yellow', value: 'yellow' },
  { color: 'teal', value: 'teal' },
  { color: 'blue', value: '#3788d8' },
  { color: 'indigo', value: 'indigo' },
  { color: 'purple', value: 'purple' },
  { color: 'black', value: 'black' },
  { color: 'grey', value: 'white' },
];
</script>
