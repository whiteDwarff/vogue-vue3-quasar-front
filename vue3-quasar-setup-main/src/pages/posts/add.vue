<template>
  <div>
    <PostWriteForm
      v-model="form"
      :title="seq ? '게시글 수정' : '게시글 작성'"
    />
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();

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

const seq = route.query?.seq;

if (seq) {
  const fetchedPostInfo = async () => {
    const { data } = await selectEditInfo({ seq });
    if (data.status == 'OK') form.value = { ...data };
    else {
      router.push(`/`);
      baseNotify('존재하지 않는 게시글입니다.', {
        type: 'warning',
      });
    }
  };
  fetchedPostInfo();
}
console.log(seq);
</script>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
