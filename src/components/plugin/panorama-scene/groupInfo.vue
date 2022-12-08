<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"

const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object
})
const group = computed(() => editorStore[props.dataOption.activeDataGroupType])


</script>
<template>
  <div>
    <box size="md">
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
          <el-link type="primary" @click="$emit('editGroup', group)">编辑</el-link>
          <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
        </div>
      </div>
      <!-- <scene-group-card :info="group"></scene-group-card> -->
    </box>
  </div>
</template>