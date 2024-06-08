<template>
  <q-list bordered separator>
    <q-item>
      <q-item-section>
        <q-item clickable class="text-bold">
          <q-item-section> 사용자별 권한 목록 </q-item-section>
        </q-item>
        <q-list bordered separator>
          <q-item
            @click="$emit('getAuthDetail', item.idntfCd)"
            v-for="item of permission"
            :key="item.idntfCd"
            clickable
          >
            <q-item-section> {{ item.idntfNm }}</q-item-section></q-item
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
  permission: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['getAuthDetail']);
</script>

<style scoped></style>
