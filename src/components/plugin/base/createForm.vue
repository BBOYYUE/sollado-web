<script setup>
import { computed, watch, ref, onMounted, defineEmits } from "vue";
import { useEditorStore } from "@/stores/editor";
import http from "@/util/http";
import * as api from "@/util/api";
import box from "@/components/box.vue"

const emit = defineEmits(['store'])


const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})
</script>
<template>
  <div>

  </div>
</template> 