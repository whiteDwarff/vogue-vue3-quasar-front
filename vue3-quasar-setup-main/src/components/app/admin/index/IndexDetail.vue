<template>
  <q-card flat class="q-pa-md border">
    <q-form class="q-gutter-y-lg">
      {{ selected }}
      <div class="row items-center">
        <label class="col-12 col-sm-3">권한그룹코드</label>
        <!-- 
        emit-value : value 속성만 업데이트
        map-option : option명은 label로 사용 
      -->
        <q-input
          v-model="selected.idntfCd"
          bottom-slots
          outlined
          dense
          class="col-12 col-sm-9"
        >
          <template v-slot:after>
            <q-btn
              @click="clearAll"
              dense
              outline
              color="grey-6"
              icon="refresh"
              :ripple="false"
            >
              <q-tooltip> 초기화 </q-tooltip>
            </q-btn>
          </template>
        </q-input>
      </div>
      <div class="row items-center">
        <label class="col-12 col-sm-3">권한그룹명</label>
        <q-input
          v-model="selected.idntfNm"
          outlined
          dense
          class="col-12 col-sm-9"
          :rules="[(val) => !!val || '권한그룹명을 입력해주세요.']"
          hide-bottom-space
          lazy-rules
        />
      </div>
      <div class="row items-center">
        <label class="col-12 col-sm-3">메모</label>
        <q-input
          v-model="selected.memo"
          outlined
          dense
          class="col-12 col-sm-9"
          :rules="[(val) => !!val || '메모를 입력해주세요.']"
          hide-bottom-space
          lazy-rules
        />
      </div>
      <div class="row items-center">
        <label class="col-12 col-sm-3">정렬</label>
        <q-input
          v-model="selected.sort"
          outlined
          dense
          class="col-12 col-sm-9"
          :rules="[(val) => !!val || '정렬을 입력해주세요.']"
          hide-bottom-space
          lazy-rules
        />
      </div>

      <q-separator />

      <div class="row items-center">
        <label class="col-12 col-sm-3">사용여부</label>
        <div class="col-12 col-sm-9">
          <q-radio
            v-model="selected.usyn"
            size="sm"
            val="Y"
            label="사용"
            class="q-mr-lg"
          />
          <q-radio v-model="selected.usyn" size="sm" val="N" label="미사용" />
        </div>
      </div>

      <q-separator />

      <div class="flex">
        <q-space />
        <q-btn
          color="red"
          label="삭제"
          outline
          class="q-mr-md"
          :ripple="false"
        />
        <q-btn
          color="teal"
          label="저장"
          outline
          :ripple="false"
          @click="beforeChk"
        />
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import axios from 'src/boot/axios';
import { baseNotify } from 'src/utils/base-notify';

const props = defineProps({
  permission: {
    type: Array,
    default: () => [],
  },
});
// optionModel
const selected = defineModel();
const emit = defineEmits(['getList']);

const clearAll = () => (selected.value = { usyn: 'Y' });

const beforeChk = () => {
  let mode = '';
  const isPkData = props.permission.find(
    (item) => item.idntfCd === selected.value.idntfCd,
  );
  console.log(isPkData);

  if (!isPkData) mode = 'S';
  else mode = 'U';

  console.log(mode);

  // if (!selected.value.idntfCd)
  //   return baseNotify('권한그룹코드를 입력해주세요.', { type: 'warning' });
  // if (!selected.value.idntfNm)
  //   return baseNotify('권한그룹명을 입력해주세요.', { type: 'warning' });
  // if (!selected.value.sort)
  //   return baseNotify('정렬을 입력해주세요.', { type: 'warning' });

  try {
    const result = api.post('/admin/index/savePermission', {
      selected: selected.value,
      mode: mode,
    });
    if (result.status == 'OK') {
      baseNotify('저장에 성공하였습니다.');
      clearAll();
      emit('getList');
    }
  } catch (err) {
    console.log(err);
    getErrorMessage(err.response);
  }
};
</script>
