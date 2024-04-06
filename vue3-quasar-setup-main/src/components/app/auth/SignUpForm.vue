<template>
  <form @submit.prevent="handleSubmit" class="q-gutter-y-md">
    <div class="text-h5 text-center q-mb-lg">회원가입</div>

    <q-input
      v-model="form.email"
      outlined
      dense
      label="이메일"
      :rules="[(val) => !!val || validateEmail(val)]"
      hide-bottom-space
    />
    <q-input
      v-model="form.nickname"
      outlined
      dense
      label="닉네임"
      placeholder="2자리이상 10자리 이하"
      :rules="[
        (val) =>
          !!val || '닉네임은 2자리에서 최대 10자리까지 사용할 수 있습니다.',
        (val) =>
          (val.trim.length > 1 && val.length < 10) ||
          '닉네임은 2자리에서 최대 10자리까지 사용할 수 있습니다.',
      ]"
      hide-bottom-space
    />
    <q-input
      v-model="form.name"
      outlined
      dense
      label="이름"
      :rules="[(val) => !!val || '이름을 입력해주세요.']"
      hide-bottom-space
    />
    <q-input
      v-model="form.tel"
      outlined
      dense
      label="휴대폰번호"
      placeholder="- 포함"
      :rules="[(val) => !val || validateTel(val)]"
      hide-bottom-space
    />
    <q-input
      v-model="form.password"
      outlined
      dense
      label="비밀번호"
      :type="!pwdVisibilityOpt ? 'password' : 'text'"
      placeholder="특수기호, 숫자를 포함한 8자리 이상 15자리 이하"
      :rules="[(val) => !val || validatePassword(val)]"
      hide-bottom-space
    >
      <template v-slot:append>
        <q-icon
          :name="!pwdVisibilityOpt ? 'visibility' : 'visibility_off'"
          color="black"
          size="1rem"
          @click.prevent="pwdVisibilityOpt = !pwdVisibilityOpt"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <q-input
      v-model="confirmPassword"
      outlined
      dense
      label="비밀번호 확인"
      :type="!pwdVisibilityOpt ? 'password' : 'text'"
      :rules="[(val) => !val || validatePasswordConfirm(val)]"
    >
      <template v-slot:append>
        <q-icon
          :name="!pwdVisibilityOpt ? 'visibility' : 'visibility_off'"
          color="black"
          size="1rem"
          @click.prevent="pwdVisibilityOpt = !pwdVisibilityOpt"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <q-separator class="q-mb-md" />

    <q-btn
      label="제출"
      type="submit"
      dense
      unelevated
      class="full-width bg-teal text-white"
    />
    <q-btn label="로그인" flat unelevated class="full-width" />
  </form>
</template>

<script setup>
// import { baseNotify } from 'src/utils';
import { signUp } from 'src/service';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateTel,
} from '/src/utils/validate-rules';
import { useRoute } from 'vue-router';

const router = useRouter();
const form = ref({
  email: '',
  nickname: '',
  name: '',
  tel: '',
  password: '',
});
const confirmPassword = ref('');
const pwdVisibilityOpt = ref(false);

const { isLoading, execute: executeSignUp } = useAsyncState(signUp, {
  immediate: false,
  throwError: true,
  onSuccess: () => {
    baseNotify('회원가입이 완료되었습니다.');
    router.push('/');
  },
});

const handleSubmit = async () => {
  console.log(form.value);
  await executeSignUp(form.value);
};
</script>

<style lang="scss" scoped></style>
