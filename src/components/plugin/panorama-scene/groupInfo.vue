<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"
import SceneGroupCard from "./sceneGroupCard.vue";

const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object
})
const group = computed(() => editorStore[props.dataOption.activeDataGroupType])
</script>
<template>
  <div>
    <box>
      <scene-group-card :info="group"></scene-group-card>
    </box>
  </div>
</template>