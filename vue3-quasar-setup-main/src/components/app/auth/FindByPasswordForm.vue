<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">
      비밀번호 찾기
    </div>

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
        lazy-rules
        hide-bottom-space
      />
      <q-btn
        type="submit"
        label="제출"
        class="full-width"
        unelevated
        color="primary"
        :loading="isLoading"
      />
      <q-btn
        @click="$emit('changeView', 'SignInForm')"
        label="로그인"
        class="full-width"
        unelevated
      />
    </q-form>
  </div>
</template>
<script setup>
import { baseNotify } from 'src/utils/base-notify';
import { validateTel, validateEmail } from '/src/utils/validate-rules';

const emit = defineEmits(['changeView', 'closeDialog']);

const form = ref({
  email: '',
  name: '',
  tel: '',
});

const { isLoading, execute } = useAsyncState(findBypassword, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    console.log(res);
    if (res?.status == 200) {
      baseNotify(res.data.message);
    }
  },
});

const handleSubmit = async () => await execute(0, form.value);
</script>
