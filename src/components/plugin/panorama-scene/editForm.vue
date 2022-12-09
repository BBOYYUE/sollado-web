<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"

const props = defineProps({
  dataOption: Object
})
const editorStore = useEditorStore();

const info = computed(() => editorStore[props.dataOption.activeDataType])
const groups = computed(() => editorStore[props.dataOption.dataGroupType])

const form = ref({})
watch(() => info.value, (info) => {
  if (info) {
    form.value = info
  }
}, {
  immediate: true,
})

</script>
<template>
  <div>
    <box size="md">
      <el-form-item label="场景名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-select v-model="form.group_id">
          <el-option v-for="info in groups" :key="info.hash_id" :label="info.name" :value="info.hash_id">{{
              info.name
          }}</el-option>
        </el-select>
      </el-form-item>
    </box>
  </div>
</template>