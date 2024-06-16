<template>
  <q-card>
    <div>/posts/[id]/[id]</div>
    {{ $route.params }}
  </q-card>
</template>

<script setup>
const posts = ref({});
const { execute } = useAsyncState(
  () => getPostsDetail(useRoute().params),
  null,
  {
    immediate: true,
    throwError: true,
    onSuccess: (res) => {
      console.log(res);
      const { data } = res.data;
    },
  },
);
</script>

<style lang="scss" scoped></style>
