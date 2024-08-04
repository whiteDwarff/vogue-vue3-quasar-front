<template>
  <q-form
    @submit.prevent="addComment"
    id="comment-wrap"
    class="row q-gutter-y-md q-col-gutter-sm q-px-sm border rounded-borders"
  >
    <textarea
      v-model="modelValue.comment"
      :readonly="!commentYn"
      :placeholder="!commentYn ? '댓글이 허용되지 않는 게시글입니다.' : ''"
      class="comment-input q-mb-md col-12 col-sm-10 block"
    />
    <q-btn
      type="submit"
      :disabled="!commentYn"
      class="col-12 col-sm-2 q-mb-md bg-teal text-white q-mt-auto"
      style="height: 50%"
      label="등록"
      dense
      unelevated
    />
  </q-form>
</template>

<script setup>
import { useAuthStore } from 'src/stores/authStore';
import { storeToRefs } from 'pinia';
import { baseNotify } from 'src/utils/base-notify';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const props = defineProps({
  commentYn: {
    type: Boolean,
    default: () => true,
  },
  postSeq: {
    type: Number,
  },
});

const modelValue = ref({
  comment: '',
});

const addComment = async () => {
  if (!modelValue.value.comment) return baseNotify('댓글을 입력해주세요.');
  try {
    let obj = {
      ...modelValue.value,
      postSeq: props.postSeq,
      userSeq: user.value.seq,
    };
    const { data } = await api.post('/posts/addComment', obj);
    console.log(data);
  } catch (err) {
    console.log(err);
    baseNotify('댓글 등록에 실패하였습니다.', {
      type: 'warning',
    });
  }
};
</script>

<style scoped>
textarea::placeholder {
  font-size: 12px;
}
.comment-input {
  resize: vertical;
  outline: none;
  border: none;
  overflow-y: auto;
  min-height: 100px;
}
.comment-input::-webkit-scrollbar {
  display: none;
}
</style>
