<template>
  <div>
    <q-item class="items-center">
      <q-item-section side>
        <q-avatar size="48px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <!-- 닉네임 클릭 시 mypge 이동 -->
        <q-item-label>
          <span class="text-subtitle2 text-weight-bold">
            {{ user.nickname }}</span
          >
          <span class="q-ml-md text-caption">{{ user.idntf_nm }}</span>
        </q-item-label>
        <!-- 가입일, 게시글 작성일 -->
        <q-item-label>
          <div>
            <span
              v-if="user?.createdAt"
              class="text-grey-14 text-caption q-mr-sm"
              >{{ user.createdAt }}</span
            >
            <span class="text-grey-14 text-caption"></span>
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
