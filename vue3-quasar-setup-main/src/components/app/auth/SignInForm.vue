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
        :type="!pwdVisibilityOpt ? 'password' : 'text'"
        placeholder="특수기호, 숫자를 포함한 8자리 이상 15자리 이하"
        :rules="[validatePassword]"
        lazy-rules
        hide-bottom-space
      />
      <div class="flex justify-between q-mt-md">
        <q-btn label="아이디 찾기" color="secondary" flat dense size="13px" />
        <q-btn label="비밀번호 찾기" color="secondary" flat dense size="13px" />
      </div>
      <q-btn
        type="submit"
        label="로그인하기"
        class="full-width"
        unelevated
        color="primary"
      />
      <q-btn
        @click="$emit('changeView', 'SignUpForm')"
        label="회원가입"
        flat
        unelevated
        class="full-width"
      />
    </q-form>
  </div>
</template>
<script setup>
import { validateEmail, validatePassword } from '/src/utils/validate-rules';
const emit = defineEmits(['changeView']);

const form = ref({
  email: '',
  password: '',
});

const { isLoading, execute } = useAsyncState(signIn, null, {
  immediate: false,
  throwError: true,
  onSuccess: () => {},
});

const handleSubmit = async () => {
  await (0, execute(form.value));
};
</script>
