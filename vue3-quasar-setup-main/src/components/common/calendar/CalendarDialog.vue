<template>
  <q-dialog
    v-model="isDialog"
    persistent
    no-shake
    transition-hide="none"
    transition-show="none"
  >
    <q-card style="width: 800px">
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat dense round :ripple="false" v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent class="q-gutter-y-md" z-max>
          <q-input v-model="form.title" outlined dense label="제목" />
          <TiptabEditor v-model="form.content" />

          <div class="row q-col-gutter-x-md">
            <q-input
              v-model="form.dayStart"
              outlined
              dense
              label="시작일"
              type="date"
              class="col-12 col-sm-6"
            />
            <q-input
              v-model="form.timeStart"
              outlined
              dense
              label="시작시간"
              type="time"
              class="col-12 col-sm-6"
            />
          </div>
          <div class="row q-col-gutter-x-md">
            <q-input
              v-model="form.dayEnd"
              outlined
              dense
              label="종료일"
              type="date"
              class="col-12 col-sm-6"
            />
            <q-input
              v-model="form.timeEnd"
              outlined
              dense
              label="종료시간"
              type="time"
              class="col-12 col-sm-6"
            />
          </div>
          <!-- sample box -->
          <div class="flex items-center q-my-lg">
            <label class="text-bold q-mr-sm">Sample : </label>
            <div
              v-if="
                form.title &&
                (form.display == 'block' || form.display == '일정')
              "
            >
              <span
                class="q-py-xs q-px-sm q-pr-xl"
                :style="{ background: form.color, color: form.textColor }"
                style="border-radius: 5px"
                >{{ form.title }}
              </span>
            </div>
            <div
              v-if="form.title && form.display == 'list-item'"
              class="flex items-center"
            >
              <span
                class="block q-mr-sm"
                style="width: 12px; height: 12px; border-radius: 50%"
                :style="{ background: form.color }"
              ></span>
              <span :style="{ color: form.textColor }" class="text-bold">{{
                form.title
              }}</span>
            </div>
          </div>
          <q-select
            v-model="form.display"
            :options
            label="구분"
            outlined
            dense
            emit-value
            map-options
            options-dense
          />
          <q-separator />
          <div class="q-gutter-x-sm flex items-center">
            <label>배경색</label>
            <q-radio
              v-for="color of colors"
              :key="color.value"
              v-model="form.color"
              keep-color
              :color="color.color"
              :val="color.value"
              size="xs"
              name="color"
            />
          </div>
          <div class="q-gutter-x-sm flex items-center">
            <label>글자색</label>
            <q-radio
              v-for="color of colors"
              :key="color.value"
              v-model="form.textColor"
              keep-color
              :color="color.color"
              :val="color.value"
              size="xs"
              name="color"
            />
          </div>
          <q-separator />
          <div class="flex">
            <q-space />
            <q-btn
              v-if="form.id"
              @click="$emit('delete', form.id)"
              label="삭제"
              outline
              color="red"
              :ripple="false"
              class="q-mr-sm"
            />
            <q-btn
              @click="$emit('edit', form.id)"
              label="저장"
              outline
              color="teal"
              type="submit"
              :ripple="false"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { bexBackground } from 'quasar/wrappers';
import TiptabEditor from 'src/components/common/tiptab/TiptabEditor.vue';

const emit = defineEmits(['edit', 'delete']);

const isDialog = defineModel('isDialog');
const form = defineModel('form');

const options = ref([
  { label: '일정', value: 'block' },
  { label: '메모', value: 'list-item' },
]);
const colors = ref([
  { color: 'red', value: 'red' },
  { color: 'orange', value: 'orange' },
  { color: 'yellow', value: 'yellow' },
  { color: 'teal', value: 'teal' },
  { color: 'blue', value: '#3788d8' },
  { color: 'indigo', value: 'indigo' },
  { color: 'purple', value: 'purple' },
  { color: 'black', value: 'black' },
  { color: 'grey', value: 'white' },
]);
</script>
