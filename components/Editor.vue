<script setup>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Table from '@editorjs/table'
import Marker from '@editorjs/marker'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const htmlelement = ref(null)

const props = defineProps({
  modelValue: {
    type: [Object, String],
    default: null,
  },
  placeholder: String,
  readOnly: Boolean,
  autofocus: Boolean,
})
const emit = defineEmits(['update:modelValue'])

let editor
let updatingModel = false

function modelToView() {
  if (!props.modelValue) {
    return
  }
  if (typeof props.modelValue === 'string') {
    editor.blocks.renderFromHTML(props.modelValue)
    return
  }

  editor.render(props.modelValue)
}

function viewToModel(_, event) {
  if (props.readOnly) {
    return
  }
  updatingModel = true

  editor.save().then((outputData) => {
    emit('update:modelValue', outputData)
  }).catch((error) => {
    console.log(event, 'Saving failed: ', error)
  }).finally(() => {
    updatingModel = false
  })
}

onMounted(() => {
  editor = new EditorJS({
    holder: htmlelement.value,
    placeholder: props.placeholder || 'Press / to see all available commands.',
    tools: {
      header: {
        class: Header,
        config: {
          placeholder: 'Type here',
          levels: [1, 2, 3, 4, 5],
          defaultLevel: 2,
        },
        inlineToolbar: true,
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
          placeholder: 'Press / to see all available commands.',
        },
      },
      linkTool: {
        class: LinkTool,
        inlineToolbar: true,
        placeholder: 'https://website.com',
        config: {
          endpoint: '/api/preview',
        },
      },
      table: {
        class: Table,
        inlineToolbar: true,
        withHeadings: true,
        stretched: true,
        config: {

          rows: 2,
          cols: 2,
          maxRows: 5,
          maxCols: 5,
        },
      },
      list: {
        class: List,
        inlineToolbar: true,
      },
      marker: Marker,
    },
    readOnly: props.readOnly,
    data: props.modelValue,
    onReady: modelToView,
    onChange: viewToModel,
    autofocus: false,
  })
})

watch(() => props.modelValue, () => {
  if (!updatingModel) {
    modelToView()
  }
})

onUnmounted(() => {
  editor.destroy()
})
</script>

<template>
  <div
    ref="htmlelement"
    class="editorjs"
  />
</template>
