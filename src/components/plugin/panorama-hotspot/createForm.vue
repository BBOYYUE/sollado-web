<script setup>
import { ref } from "vue";
import box from "@/components/box.vue"
// import * as simpleHotspot from "@/common/simpleHotspot.vue"

const emit = defineEmits(['store'])
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})
const urlList = [
  {
    uuid: 1,
    text: '向前',
    url: '%SWFPATH%/skin/hotspot_front.png',
  },
  {
    uuid: 2,
    text: '圆点',
    url: '%SWFPATH%/skin/hotspot_dot.png',
  },
  {
    uuid: 3,
    text: '圆点2',
    url: '%SWFPATH%/skin/hotspot_dot2.png',
  },
  {
    uuid: 4,
    text: '向下',
    url: '%SWFPATH%/skin/hotspot_down.png',
  },
  {
    uuid: 5,
    text: '小手',
    url: '%SWFPATH%/skin/hotspot_hand.png',
  },
  {
    uuid: 6,
    text: '向左',
    url: '%SWFPATH%/skin/hotspot_left.png',
  },
  {
    uuid: 7,
    text: '向左',
    url: '%SWFPATH%/skin/hotspot_lf.png',
  },
  {
    uuid: 8,
    text: '向右',
    url: '%SWFPATH%/skin/hotspot_right.png',
  },
  {
    uuid: 9,
    text: '向右',
    url: '%SWFPATH%/skin/hotspot_rf.png',
  }
]
const form = ref({})
</script>
<template>
  <div>
    <box size="md">
      <el-form-item :label="props.alias + '名称'">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="props.alias + '样式'">
        <el-select v-model="form.url">
          <el-option v-for="item in urlList" :key="item.url" :label="item.text" :value="item.url" />
        </el-select>
      </el-form-item>
      <span>
        <el-button size="small" type="primary" @click="$emit('store', form)">确定</el-button>
      </span>
    </box>
  </div>
</template>