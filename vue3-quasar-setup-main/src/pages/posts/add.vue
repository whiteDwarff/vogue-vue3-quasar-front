<template>
  <div>
    <PostWriteForm v-model="form" title="게시글 작성" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import PostWriteForm from 'src/components/app/posts/PostWriteForm.vue';

const form = ref({
  seq: '',
  upperSeq: '',
  lowerSeq: '',
  prepend: '',
  title: '',
  content: '',
  publicYn: true,
  commentYn: true,
});
</script>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
