<template>
  <q-form @submit.prevent="handleSubmit" class="q-gutter-y-md">
    <q-input
      v-model="form.title"
      outlined
      dense
      label="제목"
      lazy-rules
      :rules="[(val) => !!val || '제목을 입력해주세요.']"
      hide-bottom-space
    />
    <TiptabEditor v-model="form.content" />

    <div class="row q-col-gutter-md q-my-md">
      <q-input
        v-model="form.dayStart"
        outlined
        dense
        label="시작일"
        type="date"
        class="col-12 col-sm-6"
      />
      <q-input
        v-model="form.timeStart"
        outlined
        dense
        label="시작시간"
        type="time"
        class="col-12 col-sm-6"
      />
    </div>
    <div class="row q-col-gutter-md">
      <q-input
        v-model="form.dayEnd"
        outlined
        dense
        label="종료일"
        type="date"
        class="col-12 col-sm-6"
      />
      <q-input
        v-model="form.timeEnd"
        outlined
        dense
        label="종료시간"
        type="time"
        class="col-12 col-sm-6"
      />
    </div>
    <!-- sample box -->
    <div class="flex items-center q-my-lg">
      <label class="text-bold q-mr-sm">Sample : </label>
      <div
        v-if="form.title && (form.display == 'block' || form.display == '일정')"
      >
        <span
          class="q-py-xs q-px-sm q-pr-xl"
          :style="{ background: form.color, color: form.textColor }"
          style="border-radius: 5px"
          >{{ form.title }}
        </span>
      </div>
      <div
        v-if="form.title && form.display == 'list-item'"
        class="flex items-center"
      >
        <span
          class="block q-mr-sm"
          style="width: 12px; height: 12px; border-radius: 50%"
          :style="{ background: form.color }"
        ></span>
        <span :style="{ color: form.textColor }" class="text-bold">{{
          form.title
        }}</span>
      </div>
    </div>

    <q-select
      @update:model-value="onChange"
      v-model="form.display"
      :options="[
        { label: '일정', value: 'list-item' },
        { label: '메모', value: 'block' },
      ]"
      label="일정구분"
      outlined
      dense
      emit-value
      map-options
      options-dense
    />

    <q-separator />

    <ColorPalette label="배경색" v-model="form.color" />

    <q-separator />

    <div class="flex">
      <q-space />
      <q-btn
        v-if="form.id"
        @click="handleDelete(form)"
        label="삭제"
        outline
        color="red"
        :ripple="false"
        class="q-mr-sm"
      />
      <q-btn
        :loading="isLoading"
        label="저장"
        outline
        color="teal"
        type="submit"
        :ripple="false"
      />
    </div>
  </q-form>
</template>

<script setup>
import TiptabEditor from 'src/components/common/tiptab/TiptabEditor.vue';
import ColorPalette from './ColorPalette.vue';

const props = defineProps({
  handleDelete: {
    type: Function,
  },
});
const emit = defineEmits(['success']);

const form = defineModel();

// 등록 및 수정
const { isLoading, execute: executeSaveSchedule } = useAsyncState(
  saveSchedule,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: ({ data }) => {
      if (data.status == 'OK') {
        baseNotify('일정이 등록되었습니다.');
        emit('success', data.event);
      }
    },
  },
);

const handleSubmit = async () => {
  form.value.start = `${form.value.dayStart}T${form.value.timeStart}:00+09:00`;
  form.value.end = `${form.value.dayEnd}T${form.value.timeEnd}:00+09:00`;
  await executeSaveSchedule(0, form.value);
};

const onChange = (value) =>
  (form.value.textColor = value == 'block' ? 'white' : 'black');
</script>
