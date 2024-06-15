<template>
  <q-card class="row">
    <q-card-section class="col-12 col-md-4">
      <CategoryList
        :category="category.menu"
        v-model="form"
        @update:formValue="form = initializeForm"
      />
    </q-card-section>

    <q-card-section class="col-12 col-md-8" bordered>
      <CategoryForm v-model="form" @update:formValue="resetForm" />
    </q-card-section>
  </q-card>
</template>

<script>
const initializeForm = () => {
  return {
    seq: 0,
    upperSeq: 1,
    name: '',
    url: '/posts/',
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
import { watch } from 'vue';

const authStore = useAuthStore();
const systemStore = useSystemStore();

const { user } = storeToRefs(authStore);
const { category, permission, isPermission } = storeToRefs(systemStore);

const form = ref(initializeForm());

if (!form.value.permission.length)
  form.value.permission = systemStore.basePermission();

// systemStore의 permission이 셋팅되면 form에 셋팅
watch(isPermission, () => {
  form.value.permission = systemStore.basePermission();
});

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
