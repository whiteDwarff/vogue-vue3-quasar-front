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
      <CategoryForm
        v-model:form="form"
        v-model:upperMenu="upperMenu"
        @submit="handleSubmit"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';

import CategoryForm from 'src/components/app/admin/catrgory/CategoryForm.vue';

const systemStore = useSystemStore();
const { system } = storeToRefs(systemStore);

const upperMenu = ref(systemStore.categorySelectMenu());

const form = ref({
  upperSeq: upperMenu.value[0].value,
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
      idntfCd: item.idntfCd,
      value: item.idntfNm,
      access: 'Y',
      add: 'Y',
      update: 'Y',
      delete: 'Y',
    };
    form.value.permission.push(obj);
  }
};
addUserPermission();

watch(
  () => form.value.upperMenu,
  (newValue) => {
    const selectedCtrgry = upperMenu.value.find(
      (data) => data.value == newValue,
    );
    form.value.depth = selectedCtrgry.depth + 1;
    form.value.url = selectedCtrgry.url;
  },
);

const { execute, isLoading } = useAsyncState(insertCategory, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    console.log(res);
  },
});

const handleSubmit = async () => {
  await insertCategory(form.value);
};
</script>

<style lang="scss" scoped></style>
