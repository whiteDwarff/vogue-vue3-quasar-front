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
        />
      </div>
      <div class="row items-center">
        <label class="col-12 col-sm-3">메모</label>
        <q-input
          v-model="selected.memo"
          outlined
          dense
          class="col-12 col-sm-9"
        />
      </div>
      <div class="row items-center">
        <label class="col-12 col-sm-3">정렬</label>
        <q-input
          v-model="selected.sort"
          outlined
          dense
          class="col-12 col-sm-9"
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
        <q-btn color="teal" label="저장" outline :ripple="false" />
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
// optionModel
const selected = defineModel();

const clearAll = () => (selected.value = {});
</script>
