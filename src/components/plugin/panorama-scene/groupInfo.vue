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
    <box size="xs">
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
        <div class="flex flex-row">
          <el-link type="primary" @click="$emit('editGroup', group)" class="mx-1">编辑</el-link>
          <el-link type="danger" @click="$emit('delGroup', group.hash_id)" class="mx-1">移除</el-link>
        </div>
      </div>
    </box>
  </div>
</template>