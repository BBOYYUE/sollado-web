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


</script>
<template>
  <div>
    <box size="xs">
      <div class="flex flex-col ">
        <div class="flex flex-row justify-between ">
          <div class="flex-grow">
            <div class="text-xl font-bold w-48">{{ info?.name }}</div>
          </div>
        </div>
        <div class="flex flex-row">
          <el-link type="primary" @click="$emit('edit', info)" class="mx-1">编辑</el-link>
          <el-link type="danger" @click="$emit('del', info.hash_id)" class="mx-1">移除</el-link>
        </div>
      </div>
    </box>
  </div>
</template>