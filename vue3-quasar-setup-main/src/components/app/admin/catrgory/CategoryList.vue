<template>
  <q-list bordered separator>
    <q-item v-for="item of category" :key="item.seq">
      <q-item-section>
        <q-item
          @click="getCategoryDetail(item.seq)"
          clickable
          class="text-bold"
        >
          <q-item-section :class="seq == item.seq ? 'text-primary' : ''">
            {{ item.name }}
          </q-item-section>
        </q-item>
        <q-list v-if="item.midCategory.length" bordered separator>
          <q-item
            @click="getCategoryDetail(sub.seq)"
            v-for="sub of item.midCategory"
            :key="sub.seq"
            clickable
          >
            <q-item-section :class="seq == sub.seq ? 'text-primary' : ''">
              {{ sub.name }}</q-item-section
            ></q-item
          >
        </q-list>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    default: () => {},
  },
  seq: {
    type: Number,
  },
});

const emit = defineEmits(['update:formValue']);

const { execute } = useAsyncState(selectCategoryInfo, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    const form = res.data.list.form;
    emit('update:formValue', form);
  },
});

const getCategoryDetail = (seq) => {
  execute(0, seq);
};
</script>

<style scoped></style>
