<template>
  <div>
    <PostWriteForm v-model="form" title="수정하기" />
  </div>
</template>

<script setup>
import PostWriteForm from 'src/components/app/posts/PostWriteForm.vue';

import { ref } from 'vue';
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
