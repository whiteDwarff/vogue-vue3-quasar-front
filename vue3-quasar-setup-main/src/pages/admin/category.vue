<template>
  <q-card class="row q-col-gutter-md">
    <q-card-section class="col-12 col-sm-4">
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>Single line item</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline>OVERLINE</q-item-label>
            <q-item-label>Item with caption</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <!-- category-form -->
    <q-card-section class="col-12 col-sm-8" bordered>
      <q-card flat class="q-pa-md border">
        <CategoryForm
          v-model:form="form"
          v-model:upperMenu="upperMenu"
          @submit="handleSubmit"
        />
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';

import CategoryForm from 'src/components/app/admin/catrgory/CategoryForm.vue';
import { baseNotify } from 'src/utils/base-notify';

const systemStore = useSystemStore();
const { system } = storeToRefs(systemStore);

const upperMenu = ref(systemStore.categorySelectMenu());

// ----------------------------------------------------------------
// 사옹자 권한별 체크박스 셋팅
const addUserPermission = () => {
  const basket = [];
  for (let item of system.value.permission) {
    const obj = {
      idntfCd: item.idntfCd,
      value: item.idntfNm,
      access: 'Y',
      add: 'Y',
      update: 'Y',
      delete: 'Y',
    };
    basket.push(obj);
  }
  return basket;
};
// ----------------------------------------------------------------
// form의 초기값 셋팅
const initializeForm = ref({
  upperSeq: upperMenu.value[0].value,
  name: '',
  url: '/',
  sort: '',
  useYn: 'Y',
  depth: 0,
  permission: addUserPermission(),
});

const form = ref({
  ...initializeForm.value,
});
// ----------------------------------------------------------------
// form의 upperSeq를 감시하여 추가 로직 구현
watch(
  () => form.value.upperSeq,
  (newValue) => {
    const selectedCtrgry = upperMenu.value.find(
      (data) => data.value == newValue,
    );
    form.value.depth = selectedCtrgry.depth + 1;
    form.value.url = selectedCtrgry.url;
  },
);
// ----------------------------------------------------------------
// 카테고리 등록
const { execute, isLoading } = useAsyncState(insertCategory, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    console.log(res);
    if (res?.status == 201) {
      baseNotify(res.data.message);
      form.value = {
        ...initializeForm.value,
      };
    } else {
      console.log(res);
    }
  },
});

const handleSubmit = async () => {
  await execute(0, form.value);
};
</script>

<style lang="scss" scoped></style>
