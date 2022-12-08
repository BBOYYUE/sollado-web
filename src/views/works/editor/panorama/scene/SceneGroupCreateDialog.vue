<script setup>
import { computed, watch, ref, onMounted, defineProps, defineEmits } from "vue";
import http from "@/util/http";
import * as api from "@/util/api";

const props = defineProps({
  visible: Boolean,
});
const form = ref({});
const emit = defineEmits(['onClose'])
</script>
<template>
  <el-dialog v-model="props.visible" title="添加全景分组" width="500px">
    <el-form-item label="分组名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="('onClose')">取消</el-button>
        <el-button type="primary" @click="function () {
          ('onSuccess', form)
          form.value = {}
        }">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
