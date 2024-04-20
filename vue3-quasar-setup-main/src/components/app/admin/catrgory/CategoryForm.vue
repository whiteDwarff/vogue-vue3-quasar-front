<template>
  <form action="" class="q-gutter-y-lg">
    <div class="row items-center">
      <label for="" class="col-12 col-sm-3">상위타입</label>
      <q-select
        v-model="form.upperMenu"
        :options="upperMenu"
        class="col-12 col-sm-9"
        dense
        :options-dense="true"
      />
    </div>
    <div class="row items-center">
      <label for="" class="col-12 col-sm-3">카테고리명</label>
      <q-input v-model="form.name" outlined dense class="col-12 col-sm-9" />
    </div>
    <div class="row items-center">
      <label for="" class="col-12 col-sm-3">URL</label>
      <q-input v-model="form.url" outlined dense class="col-12 col-sm-9" />
    </div>
    <div class="row items-center">
      <label for="" class="col-12 col-sm-3">정렬</label>
      <q-input v-model="form.sort" outlined dense class="col-12 col-sm-9" />
    </div>

    <q-separator />

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
          <td class="text-center">{{ item.value }}</td>
          <td class="text-center">
            <q-checkbox
              v-model="form.permission[i].baseAuthAcs"
              size="sm"
              true-value="Y"
              false-value="N"
            />
          </td>
          <td class="text-center">
            <q-checkbox
              v-model="form.permission[i].baseAuthAdd"
              size="sm"
              true-value="Y"
              false-value="N"
            />
          </td>
          <td class="text-center">
            <q-checkbox
              v-model="form.permission[i].baseAuthUpd"
              size="sm"
              true-value="Y"
              false-value="N"
            />
          </td>
          <td class="text-center">
            <q-checkbox
              v-model="form.permission[i].baseAuthDel"
              size="sm"
              true-value="Y"
              false-value="N"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <div v-for="item of form.permission" :key="item.key">
      {{ item }}
    </div>
    <div class="flex">
      <q-space />
      <q-btn color="red" label="삭제" outline class="q-mr-md" :ripple="false" />
      <q-btn color="teal" label="저장" outline :ripple="false" />
    </div>
  </form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';

const systemStore = useSystemStore();
const { system } = storeToRefs(systemStore);

const upperMenu = ref(systemStore.categorySelectMenu());

const form = ref({
  upperMenu: upperMenu.value[0],
  name: '',
  url: '',
  sort: '',
  useYn: 'Y',
  depth: 0,
  permission: [],
});
const addUserPermission = () => {
  for (let item of system.value.permission) {
    const obj = {
      key: item.idntfCd,
      value: item.idntfNm,
      baseAuthAcs: 'Y',
      baseAuthAdd: 'Y',
      baseAuthUpd: 'Y',
      baseAuthDel: 'Y',
    };
    form.value.permission.push(obj);
  }
};
addUserPermission();
</script>

<style lang="scss" scoped></style>
