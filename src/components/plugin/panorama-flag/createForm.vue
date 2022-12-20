<script setup>
import { ref } from "vue";
import box from "@/components/box.vue"
import { v4 as uuid } from "uuid";
import styleList from "./styleList"
const emit = defineEmits(['store'])
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})
const form = ref({})
const groups = computed(() => editorStore[props.dataOption.dataGroupType])
function store() {
  styleList.map((item) => {
    if (item.uuid == form.value.styleUuid) {
      form.value.css = item.style.css
      form.value.mobilecss = item.style.mobilecss
    }
  })
  if (form.value.name) {
    emit('store', form.value)
    form.value = {}
  }
}


</script>
<template>
  <div>
    <box size="md">
      <el-form-item :label="props.alias + '名称'">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="props.alias + '样式'">
        <el-select v-model="form.styleUuid">
          <el-option v-for="item in styleList" :key="item.uuid" :label="item.text" :value="item.uuid" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-select v-model="form.group_id">
          <el-option v-for="info in groups" :key="info.hash_id" :label="info.name" :value="info.hash_id">{{
              info.name
          }}</el-option>
        </el-select>
      </el-form-item>
      <span>
        <el-button size="small" type="primary" @click="store">确定</el-button>
      </span>
    </box>
  </div>
</template>