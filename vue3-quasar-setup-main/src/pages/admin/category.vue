<template>
  <q-card class="row">
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
        <!-- <CategoryForm
          v-model:form="form"
          v-model:upperMenu="upperMenu"
          @submit="handleSubmit"
        /> -->

        <CategoryForm v-model="form" :options />
      </q-card>
      {{ form }}
    </q-card-section>
  </q-card>
</template>

<script>
const initializeForm = () => {
  return {
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
// import { getCategory } from 'src/service/admin/categoryService';

const category = ref([]);
const form = ref(initializeForm());
const options = ref([]);

const { execute } = useAsyncState(() => getCategory(), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    if (res?.status == 200) {
      const { list } = res.data;
      category.value = list.category;
      options.value = list.options;
      form.value.upperSeq = options.value[0].value;
      form.value.permission = list.permission;
    }
  },
});

// import { storeToRefs } from 'pinia';
// import { useSystemStore } from 'src/stores/systemStore';

// import CategoryForm from 'src/components/app/admin/catrgory/CategoryForm.vue';
// import { baseNotify } from 'src/utils/base-notify';
// import { onMounted } from 'vue';

// const systemStore = useSystemStore();
// const { system, isSystemState } = storeToRefs(systemStore);

// console.log(system.value, isSystemState.value);

// console.log(system.value, isSystemState.value);

// const upperMenu = ref(systemStore.categorySelectMenu());

// // ----------------------------------------------------------------
// // form의 upperSeq를 감시하여 추가 로직 구현
// watch(
//   () => form.value.upperSeq,
//   (newValue) => {
//     const selectedCtrgry = upperMenu.value.find(
//       (data) => data.value == newValue,
//     );
//     form.value.depth = selectedCtrgry.depth + 1;
//     form.value.url = selectedCtrgry.url;
//   },
// );
// // ----------------------------------------------------------------
// // 카테고리 등록
// const { execute, isLoading } = useAsyncState(insertCategory, null, {
//   immediate: false,
//   throwError: true,
//   onSuccess: (res) => {
//     console.log(res);
//     if (res?.status == 201) {
//       baseNotify(res.data.message);
//       form.value = {
//         ...initializeForm.value,
//       };
//     } else {
//       console.log(res);
//     }
//   },
// });

// const handleSubmit = async () => {
//   await execute(0, form.value);
// };
</script>

<style lang="scss" scoped></style>
