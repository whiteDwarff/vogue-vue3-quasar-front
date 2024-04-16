<template>
  <q-card>
    <div class="row">
      <q-list bordered separator class="col-4">
        <q-expansion-item default-opened label="대분류">
          <q-separator />

          <q-item clickable>
            <q-item-section>Single line item</q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item default-opened label="대분류">
          <q-separator />

          <q-item clickable>
            <q-item-section>Single line item</q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item default-opened label="대분류">
          <q-separator />

          <q-item clickable>
            <q-item-section>Single line item</q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>

      <div class="col-8" color="bg-red">
        <q-card flat>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab name="main" label="대분류" />
            <q-tab name="sub" label="중분류" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="main">
              <CategoryForm />
            </q-tab-panel>

            <q-tab-panel name="sub">
              <CategoryForm />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import CategoryForm from 'src/components/app/admin/catrgory/CategoryForm.vue';
const tab = ref('main');
</script>

<style lang="scss" scoped></style>
