<template>
  <q-card>
    <q-list bordered separator>
      <!-- <q-expansion-item
        v-for="item of system.category"
        :key="item.seq"
        :label="item.name"
        default-opened
        >
        <q-separator />
        <q-item v-for="a of item.midCategory" :key="a.seq" clickable>
          {{ a.name }}
        </q-item>
      </q-expansion-item> -->
      adada
    </q-list>
  </q-card>
</template>

<script setup>
const route = useRoute();
console.log(route.path.split('/').includes('admin'));
</script>

<style lang="scss" scoped></style>
