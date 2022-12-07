<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"

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
    <box>
      <el-form-item label="分组名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <span class="dialog-footer">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary">确定</el-button>
      </span>
    </box>
  </div>
</template>