<template>
  <q-card class="tiptap" flat bordered>
    <TibTabEdirotMenu :editor="editor" />

    <q-separator />

    <editor-content class="editor__content" :editor="editor" />
  </q-card>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { watch } from 'vue';
import TibTabEdirotMenu from './TibTabEdirotMenu.vue';

// 상위 컴포넌트에서 v-model을 통한 바인딩
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: '마크다운을 이용해서 편리하게 글을 작성하세요.',
    }),
    Link,
    Image,
  ],
  // editor에 변화가 일어났을 때 ~
  // 사용자의 입력 등...
  onUpdate: () => {
    emit('update:modelValue', editor.value.getHTML());
  },
});

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value.getHTML() === value;
    // 외부에서 사용자의 입력등으로 content가 변화되었지만 값이 같은 경우
    if (isSame) return;
    // 값이 다른 경우
    editor.value.commands.setContent(value, false);
  },
);
</script>

<style lang="scss" src="src/css/tiptab.scss"></style>
<style lang="scss">
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
<style lang="scss" scoped>
.editor__content {
  flex: 1;
  display: flex;
  overflow-y: auto;
  padding: 16px 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 400px;
}
</style>
<!-- 
❗️ component 호출 
  - import TiptabEditor from 'src/components//common/tiptab/TiptabEditor.vue';

❗️ component 사용
  - tiptab이 <form> 요새에 있는 경우 @submit.prevent 필수
 
-----------------------------------------------------------------
  <template>
    <q-card class="tiptap" flat bordered>
      ...
      <TiptabEditor v-model="content" />
      ...
    </q-card>
  </template>
  <script setup>
  import { ref } from 'vue';
  const content = ref('');
  </script>
  <style lang="scss" src="src/css/tibtab.scss"></style>
-----------------------------------------------------------------
 -->
