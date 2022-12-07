<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object
})
const info = computed(() => editorStore[props.dataOption.activeDataType])
</script>
<template>
  <div>
  </div>
</template>