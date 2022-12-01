<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import box from "@/components/box.vue"
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
const work = computed(() => editorStore.work, function () {
  return editorStore.work
})

</script>
<template>
  <div class="w-full h-full">
    <box class="w-full 2xl:w-1/3  md:w-1/2 ">
      <div class="flex flex-col">
        <div class="flex flex-row justify-between">
          <div class="flex-grow">
            <div class="text-2xl font-bold">{{ work.name }}</div>
            <div class="text-base mt-4">{{ work.info }}</div>
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
    </box>
  </div>
</template>