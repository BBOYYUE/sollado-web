<script setup>
import { computed, watch, ref, onMounted } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"


const emit = defineEmits(['store'])
const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})
const form = ref({})
</script>
<template>
  <div>
    <box size="xs">
      <el-form-item label="分组名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <span>
        <el-button size="small" type="primary" @click="$emit('store', form)">确定</el-button>
      </span>
    </box>
  </div>
</template>