<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">이메일 찾기</div>

    <template v-if="form.email">
      <div class="text-center q-mb-xl">
        가입하신 이메일은 <b>{{ form.email }}</b> 입니다.
      </div>
    </template>
    <q-form @submit.prevent="handleSubmit" class="q-gutter-y-md">
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
import { validateTel } from '/src/utils/validate-rules';

const emit = defineEmits(['changeView', 'closeDialog']);

const form = ref({
  name: '',
  tel: '',
  email: null,
});

const { isLoading, execute } = useAsyncState(findByEmail, null, {
  immediate: false,
  throwError: true,
  onSuccess: (res) => {
    if (res?.status == 200) {
      console.log(res.data);
      form.value.email = res.data.list.email;
    }
  },
});

const handleSubmit = async () => await execute(0, form.value);
</script>
