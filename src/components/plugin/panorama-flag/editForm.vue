<script setup>
import { ref, computed, watch } from "vue"
import box from "@/components/box.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
import styleList from "./styleList"
const emit = defineEmits(['update'])
const props = defineProps({
  alias: String,
  dataOption: Object,
})
const form = ref({})
const editorStore = useEditorStore();
const info = computed(() => editorStore[props.dataOption.activeDataType])
const groups = computed(() => editorStore[props.dataOption.dataGroupType])

function update () {
  if (form.value.name && form.value.styleUuid) {
    styleList.map((item) => {
      if (item.uuid == form.value.styleUuid) {
        form.value.css = item.style.css
        form.value.mobilecss = item.style.mobilecss
      }
    })
    emit('update', form.value, { ...info.value })
  }
}
watch(() => info.value, (info) => {
  if (info) {
    // 这里需要区分初始值和修改后的值, 所以使用了深拷贝. 
    // 如果是浅拷贝的话 form 修改的时候 info 也会跟着修改
    console.log(info)
    form.value = { ...info }
  }
}, {
  immediate: true,
})

</script>
<template>
  <div>
    <box size="xs">
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
          <el-option v-for="info in groups" :key="info.hash_id" :label="info.name" :value="info.hash_id" v-show="info.plugin == 'panorama-flag'">{{
    info.name
}}</el-option>
        </el-select>
      </el-form-item>
      <span>
        <el-button size="small" type="primary" @click="update">确定</el-button>
      </span>
    </box>
  </div>
</template>