<template>
  <div>
    <PostWriteForm v-model="form" title="글쓰기" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import PostWriteForm from 'src/components/app/posts/PostWriteForm.vue';

const form = ref({
  ctgry: '',
  sub_strgry: '',
  prepend: '',
  title: '',
  content: '',
  public_yn: true,
  comments_yn: true,
});
</script>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
