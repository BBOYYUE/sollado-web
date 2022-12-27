<script setup>
import { computed, watch, ref, onMounted } from "vue";
import * as api from "@/util/api";
const props = defineProps({
  info: Object,
});

const group = computed(() => {
  if (props.info && props.info.name) {
    return props.info;
  } else {
    return ""
  }
});

</script>
<template>
  <div class="flex flex-col ">
    <div class="flex flex-row justify-between ">
      <div class="flex-grow">
        <div class="text-2xl font-bold w-48">{{ group.name }}</div>
        <div class="text-base mt-4">{{ group.info }}</div>
      </div>
      <div>
        <el-image class="w-32 h-32 rounded-md"></el-image>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-6">
      <el-link type="primary">编辑</el-link>
      <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
    </div>
  </div>
</template>