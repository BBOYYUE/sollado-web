<script setup>
import box from "@/components/box.vue"
import SceneCard from "./SceneCard.vue";
import SceneSelectDialog from "./SceneSelectDialog.vue";
import SceneGroupCreateDialog from "./SceneGroupCreateDialog.vue";
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { v4 as uuid } from "uuid";
const panoramaDialogVisible = ref(false);
const panoramaGroupDialogVisible = ref(false);

const panoramaDialogClose = function () {
  panoramaDialogVisible.value = false;
}

const panoramaDialogGroupClose = function () {
  panoramaGroupDialogVisible.value = false;
}
const storePanoramaGroup = function (group) {
  sceneGroup.value.push({
    hash_id: uuid().split("-")[0],
    name: group.name
  })
}

const createPanoramaGroup = function () {
  panoramaGroupDialogVisible.value = true
}
const createPanorama = function () {
  panoramaDialogVisible.value = true;
}
const storePanorama = function (panoramas) {
  panoramas.map((panorama) => {
    if (!panoramaList.value[panorama.hash_id]) {
      panoramaList.value[panorama.hash_id] = panorama
    }
  })
  panoramaDialogVisible.value = false;
}

const sceneGroup = ref([])
const panoramaList = ref({})


</script>
<template>
  <div class="w-full h-full">
    <box class="w-full">
      <el-tabs>
        <el-tab-pane label="所有场景">
          <div class="m-4">
            <div class="flex flex-row flex-wrap">
              <box class="w-full md:w-1/2 xl:w-1/3 2xl:w-1/4" v-for="(info, hash_id) in panoramaList" :key="hash_id"
                v-show="info">
                <scene-card :info="info"></scene-card>
              </box>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="场景分组">
          <el-tabs tab-position="left" class="my-8">
            <el-tab-pane :key="group.hash_id" :label="group.name" v-for="group in sceneGroup">
              <div class="flex flex-row flex-wrap">
                <box class="w-56" @click="createPanorama">
                  <el-icon class="w-32 h-32">
                    <Plus />
                  </el-icon>
                </box>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-button type="primary" class="mt-6" @click="createPanoramaGroup">添加分组</el-button>
        </el-tab-pane>
      </el-tabs>
    </box>
    <scene-select-dialog :visible="panoramaDialogVisible" @onSuccess="storePanorama"
      @onClose="panoramaDialogClose"></scene-select-dialog>
    <scene-group-create-dialog :visible="panoramaGroupDialogVisible" @onSuccess="storePanoramaGroup"
      @onClose="panoramaDialogGroupClose"></scene-group-create-dialog>
  </div>
</template>