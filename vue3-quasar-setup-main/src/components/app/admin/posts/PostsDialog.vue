<template>
  <q-dialog
    v-model="isDialog"
    no-shake
    transition-hide="none"
    transition-show="none"
  >
    <q-card class="q-pa-md" style="min-width: 300px; max-width: 600px">
      <q-card-section class="flex">
        {{ form }}
        <q-space />
        <q-btn icon="close" flat dense round :ripple="false" v-close-popup />
      </q-card-section>
      <q-card-section class="q-gutter-y-md">
        <div class="text-center q-mb-lg">
          <span class="text-h5 text-weight-bold">템플릿 작성</span>
        </div>
        <!-- form -->
        <q-form @submit.prevent="handleSubmit" class="q-gutter-y-lg">
          <q-input
            autofocus
            v-model="form.title"
            :rules="[(val) => !!val || '구분명을 입력해주세요.']"
            lazy-rules
            hide-bottom-space
            label="구분"
            dense
          />

          <div class="row q-col-gutter-x-md">
            <q-select
              v-model="form.upperSeq"
              :options="category.parent.filter((data) => data.postYn == 'Y')"
              :rules="[(val) => !!val || '대분류를 선택해주세요.']"
              lazy-rules
              hide-bottom-space
              @update:model-value="updateLowerSeq"
              label="대분류"
              dense
              options-dense
              emit-value
              map-options
              class="col-12 col-sm-6"
            />

            <q-select
              v-model="form.lowerSeq"
              :options="systemStore.setLowerCategory(form.upperSeq)"
              :rules="[(val) => !!val || '대분류를 선택해주세요.']"
              lazy-rules
              hide-bottom-space
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

          <q-tabs
            v-model="tab"
            dense
            active-color="teal"
            indicator-color="teal"
            align="justify"
            narrow-indicator
            class="q-mt-xl"
          >
            <q-tab
              class="q-pt-sm"
              :class="{ current: tab == 'notice', ohter: tab != 'notice' }"
              :ripple="false"
              name="notice"
              label="공지사항"
            />
            <q-tab
              class="q-pt-sm"
              :class="{ current: tab == 'template', ohter: tab != 'template' }"
              name="template"
              label="템플릿"
              :ripple="false"
            />
          </q-tabs>

          <q-tab-panels v-model="tab" animated class="border q-mt-none panels">
            <!-- notice -->
            <q-tab-panel name="notice" class="q-pt-lg">
              <TiptabEditor v-model="form.notice" />
            </q-tab-panel>
            <!-- template -->
            <q-tab-panel name="template" class="q-pt-lg">
              <TiptabEditor v-model="form.template" />
            </q-tab-panel>
          </q-tab-panels>

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
        </q-form>
        <!-- form end -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useSystemStore } from 'src/stores/systemStore';
import { storeToRefs } from 'pinia';

const systemStore = useSystemStore();
const { category } = storeToRefs(systemStore);

const emit = defineEmits([]);

const isDialog = defineModel('isDialog');
const form = defineModel('form');
const tab = ref('notice');

// 대분류 선택시 소분류의 0번째 value를 자동으로 선택
const updateLowerSeq = (value) => {
  form.value.lowerSeq = systemStore.setLowerCategory(value)[0].value;
};
// 등록 및 수정
const { execute } = useAsyncState(saveNotice, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    emit('update:isDialog');
    baseNotify('템플릿이 등록되었습니다.');
  },
});

const handleSubmit = () => execute(0, form.value);
</script>

<style scoped>
.current {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.ohter {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.panels {
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
