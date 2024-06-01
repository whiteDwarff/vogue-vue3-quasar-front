<template>
  <q-list bordered separator>
    <q-item>
      <q-item-section>
        <q-item
          clickable
          class="text-bold"
        >
          <q-item-section>
            사용자별 권한 목록
          </q-item-section>
        </q-item>
        <q-list bordered separator>
          <q-item
            @click="getCategoryDetail(item.author_code)"
            v-for="item of rows"
            :key="item.author_code"
            clickable
          >
            <q-item-section>
              {{ item.author_nm }}</q-item-section
            ></q-item
          >
            <!-- <q-item-section :class="item.author_code == item.author_code ? 'text-primary' : ''">
              {{ item.author_nm }}</q-item-section
            ></q-item
          > -->
        </q-list>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
const props = defineProps({
  rows: {
    type: Array,
    default: () => {},
  },
});

const form = defineModel();

const emit = defineEmits(['update:formValue']);

const { execute } = useAsyncState(selectCategoryInfo, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    form.value = res.data.list.form;
  },
});

const getCategoryDetail = (seq) => {
  execute(0, seq);
};
</script>

<style scoped></style>
