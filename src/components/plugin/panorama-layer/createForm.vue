<script setup>
import { ref } from "vue";
import box from "@/components/box.vue"
import position from "./position"

const form = ref({})
const emit = defineEmits(['store'])
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})
</script>
<template>
  <div>
    <box size="md">
      <el-form-item :label="props.alias + '名称'">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="props.alias + '宽度'">
        <el-input v-model="form.width" />
      </el-form-item>
      <el-form-item :label="props.alias + '高度'">
        <el-input v-model="form.height" />
      </el-form-item>
      <el-form-item :label="props.alias + '背景颜色'">
        <el-color-picker v-model="form.bgcolor" />
      </el-form-item>
      <el-form-item :label="props.alias + '背景颜色透明度'">
        <el-slider v-model="form.bgalpha" :min="0" :max="1" :step=".1" />
      </el-form-item>
      <el-form-item :label="props.alias + '边框圆角'">
        <el-slider v-model="form.bgroundedge" :min="0" :max="20" :step="1" />
      </el-form-item>
      <el-form-item :label="props.alias + '定位方式'">
        <el-select v-model="form.align">
          <el-option :label="item.alias" :value="item.name" v-for="item in position" :key="item.uuid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="props.alias + 'x坐标'">
        <el-input v-model="form.x" />
      </el-form-item>
      <el-form-item :label="props.alias + 'y坐标'">
        <el-input v-model="form.y" />
      </el-form-item>
      <el-form-item label="内部元素是否可以滑动">
        <el-switch v-model="form.isscroll" size="small" active-text="是" inactive-text="否" />
      </el-form-item>
    </box>
  </div>
</template>