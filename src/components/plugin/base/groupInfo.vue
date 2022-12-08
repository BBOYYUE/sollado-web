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
  <div v-if="group">
    <box size="md">
      <div class="flex flex-col ">
        <div class="text-2xl font-bold w-48">{{ group.name }}</div>
        <div class="flex flex-row justify-between mt-6">
          <el-link type="primary" @click="$emit('editGroup', group)">编辑</el-link>
          <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
        </div>
      </div>
    </box>
  </div>
</template>