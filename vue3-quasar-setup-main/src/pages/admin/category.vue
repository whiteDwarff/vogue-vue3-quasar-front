<template>
  <q-card class="row">
    <q-card-section class="col-12 col-sm-4">
      <CategoryList
        :category="category.menu"
        v-model="form"
        @update:formValue="form = initializeForm"
      />
    </q-card-section>

    <q-card-section class="col-12 col-sm-8" bordered>
      <CategoryForm v-model="form" :options @update:formValue="resetForm" />
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
    depth: 1,
    permission: [],
  };
};
</script>
<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/authStore';
import { useSystemStore } from 'src/stores/systemStore';

const authStore = useAuthStore();
const systemStore = useSystemStore();

const { user } = storeToRefs(authStore);
const { category } = storeToRefs(systemStore);

const form = ref(initializeForm());
const options = ref([]);

onMounted(() => resetForm());

const resetForm = () => {
  execute();
  form.value = initializeForm();
  form.value.permission = systemStore.basePermission();
};

const { execute } = useAsyncState(() => getMenuList(user.value), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    if (res.status == 200) systemStore.setSystem(res.data);
  },
});
</script>
