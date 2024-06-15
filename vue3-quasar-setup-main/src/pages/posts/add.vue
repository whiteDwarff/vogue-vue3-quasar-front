<template>
  <div>
    <PostWriteForm v-model="form" title="글쓰기" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import PostWriteForm from 'src/components/app/posts/PostWriteForm.vue';

const form = ref({
  upperSeq: '',
  lowerSeq: '',
  prepend: '',
  title: '',
  content: '',
  publicYn: true,
  commentsYn: true,
});
</script>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
