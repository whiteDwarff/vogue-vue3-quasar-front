<template>
  <BaseDialog
    v-model="isDialog"
    @update:model-value="closeDialog"
    label="템플릿 작성"
  >
    <q-card-section class="q-gutter-y-md">
      <q-form @submit.prevent="handleSubmit" class="q-gutter-y-lg">
        <q-input
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
            :options="systemStore.getPostCategory()"
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

        <div class="row items-center">
          <label class="col-2">말머리</label>
          <div class="col-10">
            <q-radio
              v-model="form.prependYn"
              label="사용"
              class="q-mr-lg"
              val="Y"
            />
            <q-radio v-model="form.prependYn" label="미사용" val="N" />
          </div>
        </div>

        <!-- prepend -->
        <div v-if="form.prependYn == 'Y'">
          <q-input
            @keypress.enter.prevent="addPrepend"
            label="말머리 등록 ( 입력 후 ENTER • 최대 10개 )"
            outlined
            dense
          />
          <!-- chip -->
          <div class="q-mt-sm q-mb-lg">
            <q-chip
              v-for="item of form.prepend"
              :key="item"
              @remove="removePrepend(item)"
              :label="item"
              color="teal"
              outline
              removable
            />
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
            <TiptabEditor v-model="form.notice" dir="notice" />
          </q-tab-panel>
          <!-- template -->
          <q-tab-panel name="template" class="q-pt-lg">
            <TiptabEditor v-model="form.template" dir="template" />
          </q-tab-panel>
        </q-tab-panels>

        <div class="flex">
          <q-space />
          <q-btn
            v-if="form?.seq"
            @click="$emit('delete:notice')"
            label="삭제"
            color="red"
            outline
            :ripple="false"
            class="q-mr-md"
          />
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
  </BaseDialog>
</template>

<script setup>
import { useSystemStore } from 'src/stores/systemStore';
import { storeToRefs } from 'pinia';
import { baseNotify } from 'src/utils/base-notify';

const systemStore = useSystemStore();
const { category } = storeToRefs(systemStore);

const emit = defineEmits(['delete:notice']);

const isDialog = defineModel('isDialog');
const form = defineModel('form');
const tab = ref('notice');

// 대분류 선택시 소분류의 0번째 value를 자동으로 선택
const updateLowerSeq = (value) => {
  form.value.lowerSeq = systemStore.setLowerCategory(value)[0].value;
};
// ----------------------------------------------------------------
// 등록 및 수정
const { execute: executeSaveNotice } = useAsyncState(saveNotice, null, {
  immediate: false,
  throwError: true,
  onSuccess: ({ data }) => {
    if (data.status == 'OK') {
      baseNotify('템플릿이 등록되었습니다.');
      closeDialog(true);
    } else baseNotify('템플릿이 등록에 실패하였습니다.', { type: 'warning' });
  },
});
// 저장
const handleSubmit = () => {
  if (form.value.prependYn == 'N' && form.value.prepend.length)
    form.value.prepend = [];
  baseNotify(
    '<div style="text-align: center">현재 템플릿 외에 해당 게시판의 모든 템플릿은 미사용으로 변경됩니다. <br>저장하시겠습니까?</div>',
    { html: true, timeout: 5000 },
    () => executeSaveNotice(0, form.value),
    true,
  );
};

// tab이 template일 경우 dialog를 닫아도 tab의 value는 유지됨, tab 초기화
const closeDialog = (state = false) => {
  tab.value = 'notice';
  emit('update:isDialog', state);
};

const addPrepend = ({ target }) => {
  const event = target.value;
  // event가 prepend 배열에 없을때만 추가
  if (
    !form.value.prepend.includes(event) &&
    form.value.prepend.length < 10 &&
    event
  )
    form.value.prepend.push(event);
  target.value = '';
};

const removePrepend = (value) => {
  form.value.prepend = form.value.prepend.filter((item) => item != value);
};
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
