<template>
  <q-card>
    <q-list bordered separator>
      <q-expansion-item
        v-for="upper of category.menu"
        :key="upper.seq"
        :label="upper.name"
        default-opened
      >
        <q-separator />

        <q-item
          v-for="lower of upper.midCategory"
          :key="lower.seq"
          clickable
          @click="
            $router.push(
              lower.postYn == 'Y' ? `${lower.url}${lower.seq}` : `${lower.url}`,
            )
          "
          class="flex items-center"
        >
          {{ lower.name }}
        </q-item>
      </q-expansion-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/authStore';
import { useSystemStore } from 'src/stores/systemStore';

const authStore = useAuthStore();
const systemStore = useSystemStore();

const { user } = storeToRefs(authStore);
const { category } = storeToRefs(systemStore);

const { execute } = useAsyncState(() => getMenuList(user.value), null, {
  immediate: true,
  throwError: true,
  onSuccess: (res) => {
    console.log(res.data.list);
    if (res.status == 200) systemStore.setSystem(res.data);
  },
});
</script>

<style lang="scss" scoped></style>
