<template>
  <q-dialog
    v-model="isDialog"
    no-shake
    transition-hide="none"
    transition-show="none"
  >
    <q-card class="q-pa-md" style="min-width: 300px; max-width: 600px">
      {{ category }}
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat dense round :ripple="false" v-close-popup />
      </q-card-section>
      <q-card-section class="q-gutter-y-md">
        <div class="text-center q-mb-lg">
          <span class="text-h5 text-weight-bold">템플릿 작성</span>
        </div>
        <q-input label="구분" dense />

        <div class="row q-col-gutter-x-md">
          <q-select label="대분류" dense class="col-12 col-sm-6" />
          <q-select label="소분류" dense class="col-12 col-sm-6" />
        </div>

        <div class="row items-center">
          <label class="col-2">사용여부</label>
          <div class="col-10">
            <q-radio label="사용" class="q-mr-lg" val="Y" />
            <q-radio label="미사용" val="N" />
          </div>
        </div>

        <div class="border q-pa-sm" style="border-radius: 5px">
          <small class="text-grey q-mt-md">
            * 각 카테고리 공지사항을 개별 설정할 수 있습니다.<br />
            * 미사용 선택 시 등록된 기본 템플릿이 적용됩니다.
          </small>
        </div>

        <TiptabEditor />

        <div class="flex">
          <q-space />
          <q-btn
            type="submit"
            label="저장"
            color="teal"
            outline
            :ripple="false"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Array,
    default: () => [],
  },
});
const isDialog = defineModel('');
</script>

<style lang="scss" scoped></style>
