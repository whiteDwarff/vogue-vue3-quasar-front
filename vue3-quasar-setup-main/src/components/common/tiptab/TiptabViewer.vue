<template>
  <q-card class="tiptap" flat :bordered="bordered">
    <editor-content class="editor__viewer" :editor="editor" />
  </q-card>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import { Color } from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';

const props = defineProps({
  content: {
    type: String,
    default: () => '',
  },
  // border 여부
  bordered: {
    type: Boolean,
    default: () => true,
  },
});

const editor = useEditor({
  content: props.content,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    // Image.configure({
    //   allowBase64: true,
    // }), Duplicated 문제로 주석처리 (ImageResize와 중복)
    ImageResize,
    Link,
    TextStyle,
    Color,
    Underline,
    Highlight.configure({ multicolor: true }),
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
import TiptabViewer from 'src/components/tiptab/TiptabViewer.vue';

const content = ref('');
</script>
-----------------------------------------------------------------
-->
