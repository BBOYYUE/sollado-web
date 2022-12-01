<script setup>
import box from "@/components/box.vue"
import { ref, watch } from "vue";

const activePluginName = ref('');
const showPlugin = ref(false);

</script>
<template>
  <div class="static">

    <div class="w-full h-full flex flex-col">
      <box class="w-full flex-grow">
        <el-tabs type="card">
          <el-tab-pane label="场景1">
          </el-tab-pane>
        </el-tabs>
      </box>

      <!-- 底部功能区 -->
      <div class="w-full">
        <div class="m-6 shadow-md border border-solid border-gray-100 rounded-md">
          <div class="flex flex-row justify-center">
            <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4">
              <el-icon class="w-8 h-8">
                <Plus />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧插件容器 -->
    <div class="absolute right-6 top-40 shadow-md border border-solid border-gray-100 rounded-md m-6 p-6"
      v-show="showPlugin">
      <components :is="activePluginName" />
    </div>
  </div>
</template>