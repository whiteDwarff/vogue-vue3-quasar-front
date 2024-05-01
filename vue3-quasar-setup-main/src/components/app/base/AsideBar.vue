<template>
  <q-card>
    <q-list bordered separator>
      <q-expansion-item
        v-for="item of system.category"
        :key="item.seq"
        :label="item.name"
        default-opened
      >
        <q-separator />
        <q-item v-for="menu of item.midCategory" :key="menu.seq" clickable>
          <template v-if="menu.postYn == 'Y'">
            <router-link :to="`${menu.url}${menu.seq}`"
              >{{ menu.name }}, {{ menu.url }}</router-link
            >
          </template>
          <template v-else>
            <router-link :to="`${menu.url}`"
              >{{ menu.name }}, {{ menu.url }}</router-link
            >
          </template>
        </q-item>
      </q-expansion-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { useAsyncState } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/authStore';
import { useSystemStore } from 'src/stores/systemStore';

const authStore = useAuthStore();
const systemStore = useSystemStore();

const { user } = storeToRefs(authStore);
const { system, category } = storeToRefs(systemStore);

const { execute } = useAsyncState(() => getMenuList(user.value), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    console.log('--------------------------------');
    console.log('aside');
    systemStore.setCategory(systemStore.sortCategories(res.data.list.category));
    console.log(system.value);
    console.log(category);
  },
});
</script>

<style lang="scss" scoped></style>
