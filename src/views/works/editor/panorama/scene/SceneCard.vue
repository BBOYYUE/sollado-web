<script setup>
import { computed, watch, ref, onMounted } from "vue";
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
    return api.getUrl(props.info.thumb[0].path)
  } else {
    return ""
  }
});

watch(() => panoramaName, function (panoramaName) {
  console.log(panoramaName)
},
  {
    immediate: true,
  })
</script>
<template>
  <div class="flex flex-col ">
    <div class="flex flex-row justify-between ">
      <div class="flex-grow">
        <div class="text-2xl font-bold w-48">{{ panoramaName }}</div>
      </div>
      <div>
        <el-image class="w-64 h-32 rounded-md" :src="thumbPath"></el-image>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-6">
      <el-link type="primary">编辑</el-link>
      <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
    </div>
  </div>
</template>