<script setup>
import { onActivated, onMounted, watch, ref, computed } from "vue";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();

const showCreateGroup = ref(false);
const hotspotGroupList = computed(() => {
  return editorStore.hotspotGroup
})
const hotspotGroupTabClick = function () {

}


</script>
<template>
  <div class="shadow-md border border-solid border-gray-100 rounded-md mx-4 p-6 bg-white bg-opacity-25">
    <div class="w-96">
      <el-tabs>
        <el-tab-pane label="所有热点"></el-tab-pane>
        <el-tab-pane label="热点分组">
          <el-button type="primary" class=" w-full" @click="(showCreateGroup = true)">添加分组</el-button>
          <el-tabs tab-position="right" class="my-8" @tab-click="hotspotGroupTabClick">
            <el-tab-pane :key="group.hash_id" :label="group.name" v-for="group in hotspotGroupList">
              <div class="border border-solid border-gray-100 shadow-md rounded-md text-center">
                <el-icon class="w-10 h-10">
                  <Plus />
                </el-icon>
                <span>添加热点</span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>