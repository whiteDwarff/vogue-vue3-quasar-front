<template>
  <q-form>
    <q-card flat bordered>
      <q-card-section>
        <span class="text-h6">{{ props.title }}</span>
      </q-card-section>

      <q-separator inset class="q-mb-lg bg-black" />

      <q-card-section>
        <div class="row q-col-gutter-md">
          <q-select
            @update:model-value="form.upperSeq = $event"
            v-model="form.ctgry"
            :options="category.parent"
            dense
            options-dense
            emit-value
            map-options
            bottom-slots
            outlined
            label="상위카테고리"
            class="col-12 col-sm-4"
          />
          <q-select
            v-model="form.lowerSeq"
            :options="systemStore.selectByUpperCategory(form.upperSeq)"
            dense
            options-dense
            emit-value
            map-options
            bottom-slots
            outlined
            label="서브 카테고리"
            class="col-12 col-sm-4"
          />
          <q-select
            v-model="form.prepend"
            :options
            options-dense
            outlined
            dense
            label="말머리"
            class="col-12 col-sm-4"
            :readonly="!options.length"
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
          name="title"
          outlined
          dense
          placeholder="제목"
          class="q-my-md"
        />
      </q-card-section>

      <q-card-section>
        <div class="q-pa-md q-mb-md outlined">
          <p>• 정치, 주식, 코인, 개인 SNS 관련 게시물 작성 불가합니다.</p>
          <p>• 지속적으로 동일한 내용의 질문은 삼가해주세요.</p>
          <p>• 타인에 대한 배려를 해주세요.</p>
          <p class="q-mb-none">
            • 답변에 대한 대댓글은 감사를 표현하는 또 하나의 방법입니다.
          </p>
        </div>
      </q-card-section>

      <q-card-section>
        <TiptabEditor v-model="form.content" />
      </q-card-section>

      <q-card-section>
        <div class="outlined flex q-py-md">
          <q-checkbox v-model="form.public_yn" label="공개 설정" />
          <q-checkbox v-model="form.comments_yn" label="댓글 허용" />

          <q-space />

          <q-btn
            :ripple="false"
            label="제출"
            color="teal"
            unelevated
            class="q-mr-md q-py-sm q-px-lg"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';
import { watch } from 'vue';

const systemStore = useSystemStore();
const { category } = storeToRefs(systemStore);

const props = defineProps(['title']);
const form = defineModel();

// 상위카테고리 선택 시 해당 카테고리에 맞는 하위 카테고리의 0번째 값을 form.lowerSeq로 설정
watch(
  () => form.value.upperSeq,
  () => {
    const category = systemStore.selectByUpperCategory(form.value.upperSeq);
    form.value.lowerSeq = category[0].value;
  },
);
// 하위카테고리 선택 시 해당 카테고리에 맞는 말머리의 0번째를 form.prepend로 설정
watch(
  () => form.value.lowerSeq,
  () => {
    options.value = systemStore.selectByprepend(form.value.lowerSeq);
    form.value.prepend = options.length ? prepend[0] : '';
  },
);

const options = ref([]);
</script>

<style scoped>
.outlined {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.24);
}
</style>
