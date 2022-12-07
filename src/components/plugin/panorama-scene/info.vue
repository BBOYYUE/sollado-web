<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"
import SceneCard from "./sceneCard.vue";

const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object
})
const info = computed(() => editorStore[props.dataOption.activeDataType])
</script>
<template>
  <div>
    <box>
      <scene-card :info="info"></scene-card>
    </box>
  </div>
</template>