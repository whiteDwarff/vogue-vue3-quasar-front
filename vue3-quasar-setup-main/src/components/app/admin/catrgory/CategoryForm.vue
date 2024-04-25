<template>
  <form @submit.prevent="" class="q-gutter-y-lg">
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
          <td class="text-center">{{ item.idntf_nm }}</td>
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
            />
          </td>
          <td class="text-center">
            <q-checkbox
              v-model="form.permission[i].update"
              size="sm"
              true-value="Y"
              false-value="N"
            />
          </td>
          <td class="text-center">
            <q-checkbox
              v-model="form.permission[i].delete"
              size="sm"
              true-value="Y"
              false-value="N"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <div class="flex">
      <q-space />
      <q-btn color="red" label="삭제" outline class="q-mr-md" :ripple="false" />
      <q-btn
        @click="$emit('submit')"
        color="teal"
        label="저장"
        outline
        :ripple="false"
      />
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Object,
  },
});
const form = defineModel();

watch(
  () => form.value.upperSeq,
  (newValue) => {
    const selectedOption = props.options.find((data) => data.value == newValue);
    form.value.depth = selectedOption.depth + 1;
  },
);
</script>

<style lang="scss" scoped></style>
