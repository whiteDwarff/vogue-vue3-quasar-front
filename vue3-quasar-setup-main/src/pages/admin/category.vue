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

    <q-card-section class="col-12 col-sm-8">
      <CategoryForm />
    </q-card-section>
  </q-card>
</template>

<script setup>
import CategoryForm from 'src/components/app/admin/catrgory/CategoryForm.vue';
const tab = ref('main');
</script>

<style lang="scss" scoped></style>
