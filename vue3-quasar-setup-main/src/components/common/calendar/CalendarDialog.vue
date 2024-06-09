<template>
  <BaseDialog v-model="isDialog" :label="label">
    <q-card-section>
      <CalendarForm
        v-if="viewMode == 'form'"
        v-model="form"
        @success="$emit('update:modelValue', true)"
        :handleDelete
      />
      <CalendarDetail
        v-if="viewMode == 'detail'"
        v-model:form="form"
        v-model:viewMode="viewMode"
        :handleDelete
      />
    </q-card-section>
  </BaseDialog>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { baseNotify } from 'src/utils/base-notify';

const $q = useQuasar();
const emit = defineEmits(['']);

// v-model
const isDialog = defineModel('isDialog');
const form = defineModel('form');
const viewMode = defineModel('viewMode');

// ------------------------------------------------------------------------------
// 삭제
const handleDelete = async (form) => {
  $q.notify({
    message: '일정을 삭제하시겠습니까?',
    progress: true,
    actions: [
      {
        label: '취소',
        color: 'red',
        handler: () => {
          return;
        },
      },
      {
        label: '확인',
        handler: async () => {
          try {
            const { data } = await deleteSchedule(form);
            baseNotify(data.message);
            // 부모 컴포넌트에서 model 닫기, 데이터 요청 로직 실행
            // true인 경우 데이터 요청
            emit('update:modelValue', true);
          } catch (err) {
            getErrorMessage(err);
          }
        },
      },
    ],
  });
};
// ------------------------------------------------------------------------------
const label = computed(() => {
  return viewMode.value == 'form' ? '일정 등록' : '일정 상세';
});
</script>
