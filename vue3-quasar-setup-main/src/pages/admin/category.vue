<template>
  <q-card class="row">
    <q-card-section class="col-12 col-sm-4">
      <CategoryList
        :category
        :seq="form.seq"
        @update:formValue="form = $event"
      />
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
    upperSeq: '',
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
import { useSystemStore } from 'src/stores/systemStore';

const systemStore = useSystemStore();

const category = ref({});
const form = ref(initializeForm());
const options = ref([]);

const { execute } = useAsyncState(() => getCategory(), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    if (res?.status == 200) {
      const { list } = res.data;
      category.value = systemStore.sortCategories(list.category);
      options.value = list.options;
      form.value.upperSeq = options.value[0].value;
      form.value.permission = list.permission;
    }
  },
});

const refreshView = () => {
  execute();
  form.value = initializeForm();
};
</script>

<style lang="scss" scoped></style>
