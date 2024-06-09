<template>
  <div class="q-gutter-y-md">
    <table>
      <colgroup>
        <col style="width: 20%" />
        <col style="width: 30%" />
        <col style="width: 20%" />
        <col style="width: 30%" />
      </colgroup>
      <tr>
        <th class="text-weight-regular">제목</th>
        <td colspan="3" class="text-grey-14">{{ form.title }}</td>
      </tr>
      <tr>
        <th class="text-weight-regular">작성자</th>
        <td colspan="3" class="text-grey-14">{{ form.name }}</td>
      </tr>
      <tr>
        <th class="text-weight-regular">시작일</th>
        <td class="text-grey-14">{{ form.dayStart }}</td>
        <th class="text-weight-regular">시작시간</th>
        <td class="text-grey-14">{{ form.timeStart }}</td>
      </tr>
      <tr>
        <th class="text-weight-regular">종료일</th>
        <td class="text-grey-14">{{ form.dayEnd }}</td>
        <th class="text-weight-regular">종료시간</th>
        <td class="text-grey-14">{{ form.timeEnd }}</td>
      </tr>
      <tr>
        <th class="text-weight-regular">등록일</th>
        <td class="text-grey-14">{{ form.created_at }}</td>
        <th class="text-weight-regular">마지막 수정일</th>
        <td class="text-grey-14">{{ form?.updated_at }}</td>
      </tr>
    </table>
    <TiptabViewer :content="form.content" />

    <div v-if="isVerification" class="flex">
      <q-space />
      <q-btn
        @click="handleDelete(form)"
        label="삭제"
        outline
        color="red"
        :ripple="false"
        class="q-mr-sm"
      />
      <q-btn
        @click="viewMode = 'form'"
        label="수정"
        outline
        color="teal"
        type="submit"
        :ripple="false"
      />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/authStore';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useAuthStore());

const props = defineProps({
  handleDelete: {
    type: Function,
  },
});

const form = defineModel('form');
const viewMode = defineModel('viewMode');

// 본인이 등록한 일정이거나 등록인 경우 버튼 div 활성화
const isVerification = computed(() => {
  return !form.value.id || form.value.author == user.value.seq;
});
</script>

<style scoped>
table,
th,
td {
  padding: 10px 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
table {
  width: 100%;
  border-radius: 60px;
  border-collapse: collapse;
  box-shadow: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
