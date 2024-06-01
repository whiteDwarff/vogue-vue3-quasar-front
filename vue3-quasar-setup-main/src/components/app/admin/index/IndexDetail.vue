<template>
  <q-card flat class="q-pa-md border">
    <form  class="q-gutter-y-lg">dsfdsfds
      <div class="row items-center">
        <label class="col-12 col-sm-3">권한그룹코드</label>
        <!-- 
        emit-value : value 속성만 업데이트
        map-option : option명은 label로 사용 
      -->
        <!-- <q-select
          :options="category.tree"
          @update:model-value="changeSeqHanlder"
          v-model="form.upperSeq"
          dense
          options-dense
          emit-value
          map-options
          bottom-slots
          class="col-12 col-sm-9"
        > -->
        <q-input  bottom-slots outlined dense class="col-12 col-sm-9">
          <template v-slot:after>
            <q-btn
              @click="$emit('update:formValue', false)"
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
        <!-- </q-select> -->
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">카테고리명</label>
        <q-input  outlined dense class="col-12 col-sm-9" />
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">URL</label>
        <q-input
          outlined
          dense
          class="col-12 col-sm-9"
        />
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">정렬</label>
        <q-input  outlined dense class="col-12 col-sm-9" />
      </div>

      <q-separator />

      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">게시판</label>
        <div class="col-12 col-sm-9">
          <q-radio
            size="sm"
            val="Y"
            label="사용"
            class="q-mr-lg"
          />
          <q-radio size="sm" val="N" label="미사용" />
        </div>
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">공개여부</label>
        <div class="col-12 col-sm-9">
          <q-radio
            size="sm"
            val="Y"
            label="공개"
            class="q-mr-lg"
          />
          <q-radio  size="sm" val="N" label="비공개" />
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
          
        </tbody>
      </q-markup-table>

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
        />
      </div>
    </form>
  </q-card>
</template>

<script setup>


const form = ref({

})
</script>
