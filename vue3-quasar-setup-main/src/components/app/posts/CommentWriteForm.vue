<template>
  <div
    id="comment-wrap"
    class="row q-gutter-y-md q-col-gutter-sm border q-pa-sm rounded-borders"
  >
    <textarea
      :readonly="!commentYn"
      :placeholder="!commentYn ? '댓글이 허용되지 않는 게시글입니다.' : ''"
      name="comment"
      class="q-pa-sm comment-input col-12 col-sm-10 col-md-11 block"
    />
    <q-btn
      :disabled="!commentYn"
      class="col-12 col-sm-2 col-md-1 bg-teal text-white"
      style="height: 50%"
      label="등록"
      dense
      unelevated
    />
  </div>
</template>

<script setup>
const props = defineProps({
  commentYn: {
    type: Boolean,
    default: () => true,
  },
});
</script>

<style scoped>
textarea::placeholder {
  font-size: 12px;
}
.comment-input {
  /* width: 100%; */
  resize: vertical;
  outline: none;
  border: none;
  overflow-y: auto;
  min-height: 100px;
  background-color: #f00;
}
.comment-input::-webkit-scrollbar {
  display: none;
}
</style>
