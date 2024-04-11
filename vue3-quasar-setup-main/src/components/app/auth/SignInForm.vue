<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>

    <q-form @submit.prevent="handleSubmit" class="q-gutter-y-md">
      <q-input
        v-model="form.email"
        outlined
        dense
        label="이메일"
        :rules="[validateEmail]"
        lazy-rules
        hide-bottom-space
      />
      <q-input
        v-model="form.password"
        outlined
        dense
        label="비밀번호"
        placeholder="특수기호, 숫자를 포함한 8자리 이상 15자리 이하"
        :rules="[validatePassword]"
        lazy-rules
        hide-bottom-space
        type="password"
      />
      <div class="flex justify-between q-mt-md">
        <q-btn label="아이디 찾기" color="secondary" flat dense size="13px" />
        <q-btn label="비밀번호 찾기" color="secondary" flat dense size="13px" />
      </div>
      <q-btn
        type="submit"
        label="로그인"
        class="full-width"
        unelevated
        color="primary"
        :loading="isLoading"
      />
      <q-btn
        @click="$emit('changeView', 'SignUpForm')"
        label="회원가입"
        flat
        unelevated
        class="full-width"
      />
    </q-form>
    {{ form }}
  </div>
</template>
<script setup>
import { validateEmail, validatePassword } from '/src/utils/validate-rules';

const props = defineProps(['token']);
const emit = defineEmits(['changeView']);

const form = ref({
  email: '',
  password: '',
  token: props.token,
});

const { isLoading, execute } = useAsyncState(signIn, null, {
  immediate: false,
  throwError: true,
  onSuccess: (data) => {
    if (data?.status == 200) {
      baseNotify(data.message);
      console.log(data);
    }
  },
});

const handleSubmit = async () => {
  await execute(0, form);
};
</script>
