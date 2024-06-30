<template>
  <q-card flat bordered>
    <q-form @submit.prevent="handleSubmit">
      <q-card-section>
        <span class="text-h6">{{ props.title }}</span>
      </q-card-section>

      <q-separator inset class="q-mb-sm bg-black" />

      <q-card-section class="q-gutter-y-md">
        <div class="row q-col-gutter-sm">
          <!-- @update:model-value="form.upperSeq = $event" -->
          <q-select
            @update:model-value="onChangeUpperSeqHandler"
            v-model="form.upperSeq"
            :options="systemStore.getPostCategory()"
            :rules="[(val) => !!val || '상위 카테고리를 선택해주세요.']"
            lazy-rules
            hide-bottom-space
            dense
            options-dense
            emit-value
            map-options
            outlined
            label="상위 카테고리"
            class="col-12 col-sm-4"
          />
          <q-select
            @update:model-value="onChangeLowerSeqHandler"
            v-model="form.lowerSeq"
            :options="options.category"
            :rules="[(val) => !!val || '하위 카테고리를 선택해주세요.']"
            hide-bottom-space
            lazy-rules
            dense
            options-dense
            emit-value
            map-options
            outlined
            label="하위 카테고리"
            class="col-12 col-sm-4"
          />
          <q-select
            v-model="form.prepend"
            :options="options.prepend"
            options-dense
            outlined
            dense
            label="말머리"
            class="col-12 col-sm-4"
            :readonly="!options.prepend.length"
          >
            <!-- option이 없을 경우 -->
            <template v-slot:no-option>
              <q-item dense>
                <q-item-section class="text-italic text-grey text-caption">
                  등록된 말머리가 없습니다.
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <q-input
          v-model="form.title"
          :rules="[(val) => !!val || '제목을 입력해주세요.']"
          hide-bottom-space
          lazy-rules
          outlined
          dense
          placeholder="제목"
        />

        <div class="q-pb-none">
          <!-- 저장된 템플릿이 있는 경우 -->
          <TiptabViewer v-if="options.notice" :content="options.notice" />

          <!-- 저장된 템플릿이 없는 경우 default -->
          <div v-else class="q-pa-md outlined">
            <p class="text-caption text-grey-14">
              • 정치, 주식, 코인, 개인 SNS 관련 게시물 작성 불가합니다.
            </p>
            <p class="text-caption text-grey-14">
              • 지속적으로 동일한 내용의 질문은 삼가해주세요.
            </p>
            <p class="text-caption text-grey-14">
              • 타인에 대한 배려를 해주세요.
            </p>
            <p class="text-caption text-grey-14 q-mb-none">
              • 답변에 대한 대댓글은 감사를 표현하는 또 하나의 방법입니다.
            </p>
          </div>
        </div>

        <TiptabEditor v-model="form.content" />

        <div class="outlined flex">
          <q-checkbox v-model="form.publicYn" label="공개 설정" />
          <q-checkbox v-model="form.commentYn" label="댓글 허용" />

          <q-space />

          <q-btn
            :ripple="false"
            label="제출"
            color="teal"
            unelevated
            type="submit"
            class="q-mr-md q-py-sm q-px-lg"
          />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';
import { useAuthStore } from 'src/stores/authStore';

const authStore = useAuthStore();
const systemStore = useSystemStore();
const { category } = storeToRefs(systemStore);

const router = useRouter();

const props = defineProps(['title']);
const form = defineModel();
const options = ref({
  category: [],
  prepend: [],
  notice: '',
});
// 상위 카테고리가 변경되면 메서드 실행
const onChangeUpperSeqHandler = (e) => {
  // upperSeq 값 할당
  form.value.upperSeq = e;
  const category = systemStore.selectByUpperCategory(form.value.upperSeq);
  // <select> 태그는 key와 value 속성 필요, category 객체에는 해당 속성이 포함
  options.value.category = category;
  onChangeLowerSeqHandler(category[0].value);
};
// 하위 카테고리가 변경되면 메서드 실행
const onChangeLowerSeqHandler = (e) => {
  form.value.lowerSeq = e;
  const { notice, template, prepend } = systemStore.selectByprepend(form.value);
  options.value.notice = notice;
  options.value.prepend = [...prepend];
  if (options.value.prepend.length) options.value.prepend.unshift('선택 안 함');

  form.value.content = template;
  form.value.prepend = options.value.prepend[0];
};

const { execute: executeSavePosts } = useAsyncState(savePosts, null, {
  immediate: false,
  throwError: true,
  onSuccess: ({ data }) => {
    console.log(data);
    if (data.status == 'OK') {
      baseNotify('등록이 완료되었습니다.');
      router.push(`/posts/${data.lowerSeq}/${data.seq}`);
    }
  },
});

const handleSubmit = async () => {
  const prepend = form.value.prepend;
  // 말머리가 '선택안함' 인 경우 빈 값으로 초기화
  form.value.prepend = prepend == '선택 안 함' ? '' : prepend;
  // 내용이 작성되지 않은 경우 notify 반환
  if (!form.value.content)
    return baseNotify('내용을 입력해주세요.', { type: 'warning' });

  await executeSavePosts(0, form.value, authStore.getUserSeq);
};
</script>

<style scoped>
.outlined {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.24);
}
</style>
