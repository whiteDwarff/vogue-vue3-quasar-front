<template>
  <q-card class="row">
    <q-card-section class="col-12 col-sm-4">
      <CategoryList
        :category
        v-model="form"
        @update:formValue="form = initializeForm"
      />
      {{ options }}
    </q-card-section>

    <q-card-section class="col-12 col-sm-8" bordered>
      <CategoryForm v-model="form" :options @update:formValue="refreshView" />
    </q-card-section>
  </q-card>
</template>

<script>
const initializeForm = () => {
  return {
    seq: 0,
    upperSeq: 1,
    name: '',
    url: '/post/',
    sort: '',
    postYn: 'Y',
    useYn: 'Y',
    depth: 0,
    permission: [],
  };
};
</script>
<script setup>
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';

const systemStore = useSystemStore();
const { system } = storeToRefs(systemStore);

const form = ref(initializeForm());
const category = ref({});
const options = ref([]);

const { execute } = useAsyncState(() => getCategory(), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    if (res?.status == 200) {
      const { list } = res.data;
      category.value = systemStore.sortCategories(list.category);
      systemStore.setCategory(category.value);
      console.log(system.value.category);
      options.value = list.options;
      form.value.upperSeq = options.value[0].value;
      form.value.permission = list.permission;
    }
  },
});
/**
 * TODO: 권한 받아올 경우 isRefesh가 true라면 데이터 요청, false라면
 *       form.permission 재할당
 */
const refreshView = (isRefesh) => {
  execute();
  form.value = initializeForm();
};
</script>
