<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import * as api from "@/util/api";
const props = defineProps({
  info: Object,
});

const panoramaName = computed(() => {
  if (props.info && props.info.name) {
    return props.info.name;
  } else {
    return ""
  }
});
const thumbPath = computed(() => {
  if (props.info && props.info.thumb && props.info.thumb[0]) {
    return getUrl(props.info.thumb[0].path)
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
  <div class="flex flex-row justify-between">
    <el-image class="w-64 h-32" :src="thumbPath"></el-image>
    <div class="h-32 flex flex-col mr-12 justify-center">
      <div class="text-lg font-semibold">{{ panoramaName }}</div>
    </div>
  </div>
</template>