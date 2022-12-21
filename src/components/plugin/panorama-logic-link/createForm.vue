<script setup>
import { ref, onMounted } from 'vue'
import dagreD3 from "dagre-d3";
import * as d3 from "d3";
import box from "@/components/box.vue"
onMounted(() => {
  renderGagre()
  showData(["去做", "我寻思能行", "牛逼!", "成功了!"], [
  ])
})


const dagreD3Impl = new dagreD3.graphlib.Graph().setGraph({ rankdir: "LR" });
const form = ref({})
const tooltip = ref({})
const emit = defineEmits(['store'])
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})


</script>
<template>
  <box size="xs" class="overflow-x-auto">
    <el-tabs>
      <el-tab-pane label="流程图">
        <div style="width:600px; height:500px;">
          <svg id="d3" width="600" height="500"></svg>
        </div>
      </el-tab-pane>
      <el-tab-pane label="方法列表">
        <div style="width:600px; height:500px;" class="flex flex-row justify-center">
          <el-transfer v-model="value" :props="{
            key: 'value',
            label: 'desc',
          }" :data="data" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </box>

</template>
<style setup>

</style>