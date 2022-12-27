<script setup>
import { computed, watch, ref, onMounted } from "vue";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})
</script>
<template>
  <div>
    editForm
  </div>
</template>