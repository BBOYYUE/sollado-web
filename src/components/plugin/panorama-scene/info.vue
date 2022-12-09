<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"
import * as api from "@/util/api";

const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object
})
const info = computed(() => editorStore[props.dataOption.activeDataType])

const panoramaName = computed(() => {
  if (info.value && info.value.name) {
    return info.value.name;
  } else {
    return ""
  }
});
const thumbPath = computed(() => {
  if (info.value && info.value.thumb && info.value.thumb[0]) {
    return getUrl(info.value.thumb[0].path)
  } else {
    return ""
  }
});
function getUrl (url) {
  let arr = url.split("/");
  return api.assetUrl + arr[4] + "/" + arr[5];
}
watch(() => panoramaName, function (panoramaName) {
  console.log(panoramaName)
},
  {
    immediate: true,
  })
</script>
<template>
  <div>
    <box size="md">
      <div class="flex flex-col ">
        <div class="flex flex-row justify-between ">
          <div class="flex-grow">
            <div class="text-xl font-bold w-48">{{ panoramaName }}</div>
          </div>
          <div>
            <el-image class="w-64 h-32 rounded-md" :src="thumbPath"></el-image>
          </div>
        </div>
        <div class="flex flex-row justify-between mt-6">
          <el-link type="primary" @click="$emit('edit', info)">编辑</el-link>
          <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
        </div>
      </div>
      <!-- <scene-card :info="info"></scene-card> -->
    </box>
  </div>
</template>