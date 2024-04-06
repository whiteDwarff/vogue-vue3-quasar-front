<template>
  <div class="tiptap">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.content,
  extensions: [StarterKit, Link, Image],
  // 수정기능 제어
  editable: false,
});
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
import { ref } from 'vue';
import TiptabViewer from 'src/components/tiptab/TiptabViewer.vue';

const content = ref('');
</script>
-----------------------------------------------------------------
 -->
