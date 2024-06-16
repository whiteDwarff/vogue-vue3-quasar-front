<template>
  <q-card class="tiptap" flat bordered>
    <editor-content class="editor__viewer" :editor="editor" />
  </q-card>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';

const props = defineProps({
  content: {
    type: String,
    default: () => '',
  },
});

const editor = useEditor({
  content: props.content,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Image.configure({
      allowBase64: true,
    }),
    Link,
    TextStyle,
    Color,
  ],
  // 수정기능 제어
  editable: false,
});

watch(
  () => props.content,
  (newContent) => {
    if (editor.value) {
      editor.value.commands.setContent(newContent);
    }
  },
  { immediate: true },
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
.editor__viewer {
  flex: 1;
  display: flex;
  overflow-y: auto;
  padding: 16px 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  height: auto;
}
</style>

<!-- 

❗️ component 호출 
    - import TiptabViewer from 'src/components/common/tiptab/TiptabViewer.vue';
    - 해당 컴포넌트는 읽기 전용으로, 수정이 불가능 

❗️ component 사용
    - 읽기 전용이므로 v-model이 아닌 props로 바인딩
 
-----------------------------------------------------------------
<template>
    <TiptabViewer v-if="content" :content="content" />
</template>
<script setup>
import { ref } from 'vue';
import TiptabViewer from 'src/components/tiptab/TiptabViewer.vue';

const content = ref('');
</script>
-----------------------------------------------------------------
 -->
