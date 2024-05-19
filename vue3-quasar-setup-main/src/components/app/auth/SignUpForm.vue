<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>

    <q-form @submit.prevent="handleSubmit" class="q-gutter-y-md">
      <q-input
        v-model="form.email"
        outlined
        dense
        label="이메일"
        :rules="[validateEmail]"
        lazy-rules
        hide-bottom-space
        :disable="emailDuplicatedOpt"
      >
        <template v-slot:append>
          <q-btn
            label="중복확인 "
            @click="handleHasEmail"
            dense
            unelevated
            :ripple="false"
            :loading="emailLoading"
            type="button"
          />
        </template>
      </q-input>
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
            (val.length > 1 && val.length < 10) ||
            '닉네임은 2자리에서 최대 10자리까지 사용할 수 있습니다.',
        ]"
        lazy-rules
        hide-bottom-space
      />
      <q-input
        v-model="form.name"
        outlined
        dense
        label="이름"
        :rules="[(val) => !!val || '이름을 입력해주세요.']"
        lazy-rules
        hide-bottom-space
      />
      <q-input
        v-model="form.tel"
        outlined
        dense
        label="휴대폰번호 (-포함)"
        :rules="[validateTel]"
        mask="###-####-####"
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
        :rules="[(val) => validatePasswordConfirm(val, form.password)]"
        lazy-rules
        hide-bottom-space
      >
        <template v-slot:append>
          <q-icon
            :name="!pwdVisibilityOpt ? 'visibility' : 'visibility_off'"
            color="black"
            size="1rem"
            @click.capture.stop="pwdVisibilityOpt = !pwdVisibilityOpt"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <q-btn
        label="제출"
        type="submit"
        unelevated
        class="full-width"
        color="primary"
        :loading="submitLoading"
      />
      <q-btn
        @click="$emit('changeView', 'SignInForm')"
        label="로그인"
        flat
        unelevated
        class="full-width"
      />
    </q-form>
  </div>
</template>

<script setup>
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateTel,
} from '/src/utils/validate-rules';
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3';

const emit = defineEmits(['changeView']);

const form = ref({
  email: '',
  nickname: '',
  name: '',
  tel: '',
  password: '',
});
// 비밀번호 확인
const confirmPassword = ref('');
// 비밀번호 type 상태 변수
const pwdVisibilityOpt = ref(false);
// 이메일 중복검사 상태변수
const emailDuplicatedOpt = ref(false);

// --------------------------------------------------------------------------
// 회원가입
const { isLoading: submitLoading, execute: fetchedSignUp } = useAsyncState(
  signUp,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: (data) => {
      if (data?.status == 201) {
        baseNotify('회원가입이 완료되었습니다. 로그인 후 이용해주세요.');
        emit('changeView', 'SignInForm');
      }
    },
  },
);
const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

const handleSubmit = async () => {
  if (emailDuplicatedOpt.value) {
    await recaptchaLoaded();
    const token = await executeRecaptcha('auth');

    await fetchedSignUp(0, { ...form.value, token });
  } else baseNotify('이메일 중복검사를 해주세요.', { type: 'warning' });
};
// --------------------------------------------------------------------------
// 이메일 중복검사
const { isLoading: emailLoading, execute: fetchedHasEmail } = useAsyncState(
  duplicatedEmail,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status == 200) {
        baseNotify(
          '사용할 수 있는 이메일입니다. 현재 이메일을 사용하시겠습니까?',
          {},
          () => {
            emailDuplicatedOpt.value = true;
          },
          true,
        );
      }
    },
  },
);

const handleHasEmail = async () => {
  if (validateEmail(form.value.email) == true)
    await fetchedHasEmail(0, form.value);
  else baseNotify('이메일 형식이 아닙니다', { type: 'warning' });
};
</script>

<style lang="scss" scoped></style>
