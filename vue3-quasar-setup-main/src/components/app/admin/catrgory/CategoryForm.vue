<template>
  <div>
    <form action="" class="q-gutter-y-lg">
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">상위타입</label>
        <q-input outlined dense class="col-12 col-sm-9" />
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">카테고리명</label>
        <q-input outlined dense class="col-12 col-sm-9" />
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">URL</label>
        <q-input outlined dense class="col-12 col-sm-9" />
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">정렬</label>
        <q-input outlined dense class="col-12 col-sm-9" />
      </div>

      <q-separator />

      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">공개여부</label>
        <div class="col-12 col-sm-9">
          <q-radio size="sm" val="y" label="공개" />
          <q-radio size="sm" v-model="shape" val="n" label="비공개" />
        </div>
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">접근권한</label>
        <div class="col-12 col-sm-9">
          <q-checkbox size="sm" val="a" label="ANONYMOUS" />
          <q-checkbox size="sm" val="b" label="일반사용자" />
          <q-checkbox size="sm" v-model="shape" val="c" label="사이트관리자" />
          <q-checkbox size="sm" v-model="shape" val="d" label="시스템관리자" />
        </div>
      </div>
      <div class="row items-center">
        <label for="" class="col-12 col-sm-3">사용권한</label>
        <div class="col-12 col-sm-9">
          <q-checkbox size="sm" val="a" label="게시글 작성" />
          <q-checkbox size="sm" val="b" label="게시글 수정" />
          <q-checkbox size="sm" val="b" label="게시글 삭제" />
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
    </form>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
