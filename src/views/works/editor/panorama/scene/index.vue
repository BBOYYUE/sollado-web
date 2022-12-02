<script setup>
import box from "@/components/box.vue"
import SceneCard from "./SceneCard.vue";
import SceneSelectDialog from "./SceneSelectDialog.vue";
import SceneGroupCreateDialog from "./SceneGroupCreateDialog.vue";
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import { v4 as uuid } from "uuid";
import { useRoute, useRouter } from "vue-router";

const editorStore = useEditorStore();
const router = useRouter();
const panoramaDialogVisible = ref(false);
const panoramaGroupDialogVisible = ref(false);


const panoramaDialogOpen = function () {
  panoramaDialogVisible.value = true;
}
const panoramaGroupDialogOpen = function () {
  panoramaGroupDialogVisible.value = true;
}
const panoramaDialogClose = function () {
  panoramaDialogVisible.value = false;
}
const panoramaDialogGroupClose = function () {
  panoramaGroupDialogVisible.value = false;
}

const storePanoramaGroup = function (group) {
  let data = {
    hash_id: uuid().split("-")[0],
    name: group.name
  }
  editorStore.addSceneGroup(data)
  panoramaDialogGroupClose()
}
const storePanorama = function (panoramas) {
  let panoramaList = {}
  panoramas.map((panorama) => {
    if (!panoramaList[panorama.hash_id]) {
      panoramaList[panorama.hash_id] = panorama
    }
  })
  editorStore.addScene(panoramaList)
  panoramaDialogClose()
}

const sceneGroupTabClick = function (pane) {
  editorStore.setActiveSceneGroup(sceneGroup.value[pane.props.name])
}
const sceneClick = function (scene) {
  editorStore.setActiveScene(scene)
  router.push('/work/editor/panorama/' + work.value.hash_id + '/editor/' + scene.hash_id);
}


const sceneGroup = computed(() => editorStore.sceneGroup)
const scene = computed(() => editorStore.scene)
const activeSceneGroup = computed(() => editorStore.activeSceneGroup)
const activeScene = computed(() => editorStore.activeScene)
const work = computed(() => editorStore.work)

</script>
<template>
  <div class="w-full h-full">
    <box class="w-full">
      <el-tabs>
        <el-tab-pane label="所有场景">
          <div class="m-4">
            <box>
              <div class="text-2xl font-bold">场景列表</div>
              <div class="flex flex-row flex-wrap">
                <box class="w-full md:w-1/2 xl:w-1/3 2xl:w-1/4" v-for="(info, hash_id) in scene" :key="hash_id"
                  v-show="info">
                  <scene-card :info="info"></scene-card>
                </box>
              </div>
            </box>
          </div>
        </el-tab-pane>
        <el-tab-pane label="场景分组">
          <el-tabs tab-position="left" class="my-8" @tab-click="sceneGroupTabClick">
            <el-tab-pane :key="group.hash_id" :label="group.name" v-for="group in sceneGroup" :name="group.hash_id">
              <box class="w-full 2xl:w-1/3  md:w-1/2 ">
                <div class="flex flex-col">
                  <div class="flex flex-row justify-between">
                    <div class="flex-grow">
                      <div class="text-2xl font-bold">{{ group.name }}</div>
                      <div class="text-base mt-4">{{ group.info }}</div>
                    </div>
                    <div>
                      <el-image class="w-32 h-32 rounded-md"></el-image>
                    </div>
                  </div>
                  <div class="flex flex-row justify-between mt-6">
                    <el-link type="primary">编辑</el-link>
                    <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
                  </div>
                </div>
              </box>
              <box>
                <div class="text-2xl font-bold">场景列表</div>
                <div class="flex flex-row flex-wrap">
                  <box class="w-56" @click="panoramaDialogOpen">
                    <el-icon class="w-32 h-32">
                      <Plus />
                    </el-icon>
                  </box>
                  <box class="w-full md:w-1/2 xl:w-1/3 2xl:w-1/4" v-for="hash_id in group.scenes" :key="hash_id"
                    v-show="scene[hash_id]" @click="sceneClick(scene[hash_id])">
                    <scene-card :info="scene[hash_id]"></scene-card>
                  </box>
                </div>
              </box>
            </el-tab-pane>
          </el-tabs>
          <el-button type="primary" class="mt-6" @click="panoramaGroupDialogOpen">添加分组</el-button>
        </el-tab-pane>
      </el-tabs>
    </box>
    <scene-select-dialog :visible="panoramaDialogVisible" @onSuccess="storePanorama"
      @onClose="panoramaDialogClose"></scene-select-dialog>
    <scene-group-create-dialog :visible="panoramaGroupDialogVisible" @onSuccess="storePanoramaGroup"
      @onClose="panoramaDialogGroupClose"></scene-group-create-dialog>
  </div>
</template>