<template>
  <div v-if="editor" class="flex flex items-center q-pa-xs">
    <!-- text-color -->
    <q-btn
      flat
      dense
      icon="sym_o_border_color"
      @click="color.click()"
      :style="{ color: setIconColor(editor.getAttributes('textStyle')) }"
    >
      <q-tooltip class="bg-grey"> 선택 후 ENTER </q-tooltip>
      <input
        ref="color"
        type="color"
        @input="editor.chain().focus().setColor($event.target.value).run()"
        :value="editor.getAttributes('textStyle').color || '#000000'"
        style="width: 0px"
        class="invisible"
      />
    </q-btn>
    <!-- background-color -->
    <q-btn
      flat
      dense
      icon="sym_o_palette"
      @click="highlight.click()"
      :style="{
        color: setIconColor(editor.getAttributes('highlight')),
      }"
    >
      <q-tooltip class="bg-grey"> 선택 후 ENTER </q-tooltip>
      <input
        ref="highlight"
        type="color"
        @input="
          editor
            .chain()
            .focus()
            .toggleHighlight({ color: $event.target.value })
            .run()
        "
        :value="editor.getAttributes('highLight').color || '#ffffff'"
        style="width: 0px"
        class="invisible"
      />
    </q-btn>
    <q-separator vertical inset spaced />
    <!-- bold -->
    <q-btn
      flat
      dense
      icon="sym_o_format_bold"
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :color="editor.isActive('bold') ? 'blue' : null"
    />

    <!-- italic -->
    <q-btn
      flat
      dense
      icon="sym_o_format_italic"
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :color="editor.isActive('italic') ? 'blue' : null"
    />
    <!-- text-align-->
    <q-btn flat dense :icon="icon.align" color="blue">
      <q-menu>
        <q-btn
          flat
          dense
          v-close-popup
          icon="sym_o_format_align_left"
          @click="
            editor.chain().focus().setTextAlign('left').run(),
              (icon.align = 'sym_o_format_align_left')
          "
        />
        <q-btn
          flat
          dense
          v-close-popup
          icon="sym_o_format_align_center"
          @click="
            editor.chain().focus().setTextAlign('center').run(),
              (icon.align = 'sym_o_format_align_center')
          "
        />
        <q-btn
          flat
          dense
          v-close-popup
          icon="sym_o_format_align_right"
          @click="
            editor.chain().focus().setTextAlign('right').run(),
              (icon.align = 'sym_o_format_align_right')
          "
        />
      </q-menu>
    </q-btn>
    <!-- indent -->
    <q-btn
      flat
      dense
      icon="sym_o_format_quote"
      @click="editor.chain().focus().toggleBlockquote().run()"
      :color="editor.isActive('blockquote') ? 'blue' : null"
    />
    <!-- text-decoration -->
    <q-btn
      flat
      dense
      icon="sym_o_format_underlined"
      @click="editor.chain().focus().toggleUnderline().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :color="editor.isActive('underline') ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_strikethrough_s"
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :color="editor.isActive('strike') ? 'blue' : null"
    />
    <!-- hiper-link -->
    <q-btn
      flat
      dense
      icon="sym_o_link"
      @click="handleLinkMenu"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :color="editor.isActive('link') ? 'blue' : null"
    />
    <q-separator vertical inset spaced />
    <!-- code -->
    <q-btn
      flat
      dense
      icon="sym_o_code_blocks"
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :color="editor.isActive('codeBlock') ? 'blue' : null"
    />
    <q-separator vertical inset spaced />
    <!-- 웹에 저장된 이미지의 URL 셋팅 -->
    <q-btn flat dense icon="sym_o_image" @click="handleImageMenu">
      <q-tooltip class="bg-grey"> 이미지 URL 입력 </q-tooltip>
    </q-btn>
    <!-- 이미지를 서버에 저장 후 서버 URL 셋팅 -->
    <q-btn
      v-if="dir"
      flat
      dense
      icon="sym_o_photo_library"
      @click="file.click()"
    >
      <q-tooltip class="bg-grey"> 이미지 업로드 </q-tooltip>
    </q-btn>
    <q-separator vertical inset spaced />
    <!-- heading 1 -->
    <q-btn
      flat
      dense
      icon="sym_o_format_h1"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :color="editor.isActive('heading', { level: 1 }) ? 'blue' : null"
    />
    <!-- heading 2 -->
    <q-btn
      flat
      dense
      icon="sym_o_format_h2"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :color="editor.isActive('heading', { level: 2 }) ? 'blue' : null"
    />
    <!-- heading 3 -->
    <q-btn
      flat
      dense
      icon="sym_o_format_h3"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :color="editor.isActive('heading', { level: 3 }) ? 'blue' : null"
    />
    <q-separator vertical inset spaced />
    <!-- unOrder list button -->
    <q-btn
      flat
      dense
      icon="sym_o_format_list_bulleted"
      @click="editor.chain().focus().toggleBulletList().run()"
      :color="editor.isActive('bulletList') ? 'blue' : null"
    />
    <!-- order list button -->
    <q-btn
      flat
      dense
      icon="sym_o_format_list_numbered"
      @click="editor.chain().focus().toggleOrderedList().run()"
      :color="editor.isActive('orderedList') ? 'blue' : null"
    />
    <!-- horizontal button -->
    <q-btn
      flat
      dense
      icon="sym_o_horizontal_rule"
      @click="editor.chain().focus().setHorizontalRule().run()"
    />
    <q-separator vertical inset spaced />
    <!-- undo button -->
    <q-btn
      flat
      dense
      icon="sym_o_undo"
      @click="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
    />
    <!-- redo button -->
    <q-btn
      flat
      dense
      icon="sym_o_redo"
      @click="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
    />
    <input
      ref="file"
      type="file"
      hidden
      multiple
      @change="readImageURL($event)"
    />
  </div>
  <div></div>
</template>

<script setup>
import { useAsyncState } from '@vueuse/core';

const props = defineProps({
  editor: {
    type: Object,
  },
  dir: {
    type: String,
  },
});
const icon = ref({
  align: 'sym_o_format_align_left',
});
const color = ref(null);
const highlight = ref(null);

const setIconColor = ({ color }) => {
  return color != '#ffffff' ? color : '#ccc';
};
// -----------------------------------------------------------
// insert Link
const handleLinkMenu = () => {
  if (props.editor.isActive('link')) {
    props.editor.chain().focus().unsetLink().run();
    return;
  }
  const previousUrl = props.editor.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === '') {
    props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  // update link
  props.editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run();
};
// -----------------------------------------------------------
// image url insert
const handleImageMenu = () => {
  const url = window.prompt('이미지 URL을 입력해주세요.');
  if (url) {
    props.editor.chain().focus().setImage({ src: url }).run();
  }
};
// -----------------------------------------------------------
// image upload
const file = ref(null);

const readImageURL = async ({ target }) => {
  const images = target.files;
  if (images.length) {
    try {
      const form = new FormData();
      for (let i = 0; i < images.length; i++) {
        // 파일 유효성 검사 : jpg, jpeg, png, gif 확장자만 에디터 내부에 삽입할 수 있다.
        let fileName = images[i].name;
        let lastDot = fileName.lastIndexOf('.');
        let ext = fileName.substring(lastDot, fileName.length).toLowerCase();
        let extArr = process.env.IMAGE_EXT.split(',');

        if (!extArr.includes(ext))
          return baseNotify(
            `${process.env.IMAGE_EXT} 확장자만 등록 가능합니다`,
            {
              type: 'warning',
            },
          );

        form.append('images', images[i]);
      }
      // 이미지 저장 경로 설정
      // TODO:server.webMvcConfig에 해당 경로 설정 확인 **
      form.append('dir', props.dir);

      const { data } = await api.post('/system/imageUpload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // 저장한 이미지 editor에 바인딩
      for (let image of data) {
        let uploadImg = `<img src='${
          process.env.SERVER_PORT + image.filePath
        }' class='editor__image' alt='image'> `;

        props.editor.commands.insertContent(uploadImg);
      }
    } catch {
      baseNotify('이미지 저장 실패', { type: 'warning' });
    }
  }
};
</script>

<style lang="scss" scoped></style>
