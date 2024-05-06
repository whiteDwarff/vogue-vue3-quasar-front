<template>
  <q-dialog
    v-model="isDialog"
    no-shake
    transition-hide="none"
    transition-show="none"
  >
    <q-card class="q-pa-md" style="min-width: 300px; max-width: 600px">
      {{ form }}
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat dense round :ripple="false" v-close-popup />
      </q-card-section>
      <q-card-section class="q-gutter-y-md">
        <div class="text-center q-mb-lg">
          <span class="text-h5 text-weight-bold">템플릿 작성</span>
        </div>
        <form @submit.prevent="execute(0, form)" class="q-gutter-y-lg">
          <q-input v-model="form.title" label="구분" dense />

          <div class="row q-col-gutter-x-md">
            <q-select
              v-model="form.upperSeq"
              :options="systemCategory.parent"
              @update:model-value="updateLowerSeq"
              label="대분류"
              dense
              options-dense
              emit-value
              map-options
              class="col-12 col-sm-6"
              :value="systemCategory.parent[0].value"
            />

            <q-select
              v-model="form.lowerSeq"
              :options="systemStore.setLowerCategory(form.upperSeq)"
              label="소분류"
              dense
              options-dense
              emit-value
              map-options
              class="col-12 col-sm-6"
            />
          </div>

          <div class="row items-center">
            <label class="col-2">사용여부</label>
            <div class="col-10">
              <q-radio
                v-model="form.useYn"
                label="사용"
                class="q-mr-lg"
                val="Y"
              />
              <q-radio v-model="form.useYn" label="미사용" val="N" />
            </div>
          </div>

          <div class="border q-pa-sm" style="border-radius: 5px">
            <small class="text-grey q-mt-md">
              * 각 카테고리 공지사항을 개별 설정할 수 있습니다.<br />
              * 미사용 선택 시 등록된 기본 템플릿이 적용됩니다.
            </small>
          </div>

          <TiptabEditor v-model="form.content" />

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
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useSystemStore } from 'src/stores/systemStore';
import { storeToRefs } from 'pinia';
import { useAsyncState } from '@vueuse/core';

const systemStore = useSystemStore();
const { category: systemCategory } = storeToRefs(systemStore);

const isDialog = defineModel('isDialog');
const form = defineModel('form');

const updateLowerSeq = (value) => {
  form.value.lowerSeq = systemStore.setLowerCategory(value)[0].value;
};

const { execute } = useAsyncState(saveNotice, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    console.log(res);
  },
});
</script>

<style lang="scss" scoped></style>
