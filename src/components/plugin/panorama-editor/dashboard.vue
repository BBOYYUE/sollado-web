<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import JsonFormatter from "json-string-formatter";
import box from "@/components/box.vue"

const editString = ref("")
const editorStore = useEditorStore();
function updateEditString () {
  editString.value = JsonFormatter.format(JSON.stringify(editorStore.value))
}
function editChange (text) {
  console.log(text)
}
watch(() => editorStore, (editorStore) => {
  console.log(editorStore)
  let data = {
    work: editorStore.work,
    secne: editorStore.scene,
    sceneGroup: editorStore.sceneGroup,
    hotspot: editorStore.hotspot,
    hotspotGroup: editorStore.hotspotGroup,
    layer: editorStore.layer,
    layerGroup: editorStore.layerGroup,
    view: editorStore.view,
    viewGroup: editorStore.viewGroup,
    logic: editorStore.logic,
    logicGroup: editorStore.logicGroup,
    button: editorStore.button,
    buttonGroup: editorStore.buttonGroup
  }
  let json = JsonFormatter.format(JSON.stringify(data));
  editString.value = json
}, {
  immediate: true,
})
</script>
<template>
  <div style="width: 900px; height: 700px;">
    <box size="md">
      <vue-codemirror v-model="editString" @change="editChange" style="height: 700px"></vue-codemirror>
    </box>
  </div>
</template>