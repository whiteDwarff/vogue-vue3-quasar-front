<template>
  <q-card flat class="q-pa-md border">
    <form @submit.prevent="handleSubmit" class="q-gutter-y-lg">
      <div class="row items-center">
        <label class="col-12 col-sm-3">상위타입</label>
        <!-- 
        emit-value : value 속성만 업데이트
        map-option : option명은 label로 사용 
      -->
        <q-select
          :options="options"
          v-model="form.upperSeq"
          dense
          options-dense
          emit-value
          map-options
          class="col-12 col-sm-9"
        />
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">카테고리명</label>
        <q-input v-model="form.name" outlined dense class="col-12 col-sm-9" />
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">URL</label>
        <q-input
          v-model="form.url"
          :readonly="form.postYn == 'Y'"
          outlined
          dense
          class="col-12 col-sm-9"
        />
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">정렬</label>
        <q-input v-model="form.sort" outlined dense class="col-12 col-sm-9" />
      </div>

      <q-separator />

      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">게시판</label>
        <div class="col-12 col-sm-9">
          <q-radio
            v-model="form.postYn"
            size="sm"
            val="Y"
            label="사용"
            class="q-mr-lg"
          />
          <q-radio v-model="form.postYn" size="sm" val="N" label="미사용" />
        </div>
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">공개여부</label>
        <div class="col-12 col-sm-9">
          <q-radio
            v-model="form.useYn"
            size="sm"
            val="Y"
            label="공개"
            class="q-mr-lg"
          />
          <q-radio v-model="form.useYn" size="sm" val="N" label="비공개" />
        </div>
      </div>

      <q-separator />

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-center">사용자</th>
            <th class="text-center">접근권한</th>
            <th class="text-center">등록</th>
            <th class="text-center">수정</th>
            <th class="text-center">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) of form.permission" :key="i">
            <td class="text-center">{{ item.idntfNm }}</td>
            <td class="text-center">
              <q-checkbox
                v-model="form.permission[i].access"
                size="sm"
                true-value="Y"
                false-value="N"
              />
            </td>
            <td class="text-center">
              <q-checkbox
                v-model="form.permission[i].add"
                size="sm"
                true-value="Y"
                false-value="N"
                :disable="form.depth != 2"
              />
            </td>
            <td class="text-center">
              <q-checkbox
                v-model="form.permission[i].update"
                size="sm"
                true-value="Y"
                false-value="N"
                :disable="form.depth != 2"
              />
            </td>
            <td class="text-center">
              <q-checkbox
                v-model="form.permission[i].delete"
                size="sm"
                true-value="Y"
                false-value="N"
                :disable="form.depth != 2"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>

      <div class="flex">
        <q-space />
        <q-btn
          v-if="form.seq"
          @click="handleDelete"
          color="red"
          label="삭제"
          outline
          class="q-mr-md"
          :ripple="false"
        />
        <q-btn
          @click="handleSubmit"
          color="teal"
          label="저장"
          outline
          :ripple="false"
          :loading="saveLoading"
        />
      </div>
    </form>
  </q-card>
</template>

<script setup>
import { baseNotify } from 'src/utils/base-notify';

const emit = defineEmits('update:formValue');
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});

const form = defineModel();
// --------------------------------------------------------------------------
// 카테고리 등록 및 수정
const { isLoading: saveLoading, execute: save } = useAsyncState(
  saveCategory,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: (res) => {
      if (res?.status == 201) {
        baseNotify(res.data.message);
        emit('update:formValue');
      }
    },
  },
);

const handleSubmit = async () => {
  await save(0, form.value);
};
// --------------------------------------------------------------------------
// 카테고리 삭제
const { isLoading: deleteLoading, execute } = useAsyncState(
  deleteCategory,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: (res) => {
      if (res?.status == 200) {
        baseNotify(res.data.message);
        emit('update:formValue');
      }
    },
  },
);

const handleDelete = () => {
  const message =
    form.value.depth < 2
      ? '상위항목 삭제 시 하위항목도 삭제됩니다. 삭제하시겠습니까?'
      : '카테고리를 삭제하시겠습니까?';
  baseNotify(
    message,
    { timeout: 5000 },
    () => {
      execute(0, form.value);
    },
    true,
  );
  console.log(form.value.seq, form.value.depth);
};

watch(
  () => form.value.upperSeq,
  (newValue) => {
    const selectedOption = props.options.find((data) => data.value == newValue);
    form.value.depth = selectedOption.depth + 1;
    for (let item of form.value.permission) {
      if (form.value.depth < 2) {
        item.add = null;
        item.update = null;
        item.delete = null;
      } else {
        item.add = 'Y';
        item.update = 'Y';
        item.delete = 'Y';
      }
    }
  },
);
</script>

<style lang="scss" scoped></style>
