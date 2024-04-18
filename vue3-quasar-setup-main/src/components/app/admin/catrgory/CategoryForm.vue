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
          <q-radio size="sm" val="y" label="공개" class="q-mr-lg" />
          <q-radio size="sm" val="n" label="비공개" />
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
          <tr>
            <td class="text-center">ANONYMOUS</td>
            <td class="text-center">
              <q-checkbox size="sm" val="a" />
            </td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"></td>
          </tr>
          <tr>
            <td class="text-center">일반사용자</td>
            <td class="text-center">
              <q-checkbox size="sm" val="a" />
            </td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"></td>
          </tr>
          <tr>
            <td class="text-center">사이트관리자</td>
            <td class="text-center">
              <q-checkbox size="sm" val="a" />
            </td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"></td>
          </tr>
          <tr>
            <td class="text-center">시스템관리자</td>
            <td class="text-center">
              <q-checkbox size="sm" val="a" />
            </td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"><q-checkbox size="sm" val="a" /></td>
            <td class="text-center"></td>
          </tr>
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
        <q-btn color="teal" label="저장" outline :ripple="false" />
      </div>
    </form>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
