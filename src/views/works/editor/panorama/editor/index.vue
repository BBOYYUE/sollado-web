<script setup>
import box from "@/components/box.vue"
import panorama from "./panorama.vue"
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import { v4 as uuid } from "uuid";
import * as api from "@/util/api";
import { useRoute, useRouter } from "vue-router";
import pluginCommon from "@/common/plugin/index.js"
import pluginBase from "@/components/plugin/index.js"


const pluginList = () => {
  let list = []
  let pluginBaseImpl = new pluginBase()
  for (let index in pluginCommon) {
    console.log(pluginCommon[index])
    list.push(pluginBaseImpl.builder(pluginCommon[index]));
  }
  return list
}


const router = useRouter();
const activePlugin = ref({});
const showPlugin = ref(false);
const panoId = uuid().split("-")[0]
const props = defineProps({
  sceneid: String,
});
const editorStore = useEditorStore();
const sceneGroup = computed(() => editorStore.sceneGroup)
const scene = computed(() => editorStore.scene)


function getUrl (url) {
  let arr = url.split("/");
  return api.assetUrl + arr[4] + "/" + arr[5];
}
const pluginClick = function (plugin) {
  activePlugin.value = plugin
  showPlugin.value = true
}


// const getXmlPath = (sceneId) => {
//   if (editorList.value[sceneId] && editorList.value[sceneId].xml && editorList.value[sceneId].xml[0]) {
//     return getUrl(editorList.value[sceneId].xml[0].path)
//   } else {
//     return ""
//   }
// }
// const editorList = ref({});
// watch(() => props.sceneid, function (sceneId) {
//   if (!editorList.value[sceneId]) {
//     editorList.value[sceneId] = scene.value[sceneId]
//   }
// }, {
//   immediate: true,
// })

</script>
<template>
  <div class="static">

    <div class="w-full h-full flex flex-col">
      <div class="w-full flex-grow" id="panoramaBox">
        <div class="border border-solid border-gray-100 shadow-md rounded-md mx-6 mt-4 p-6">
          <div v-for="editor, index in editorList" :key="index">
            <panorama :panoId="index" :xmlPath="getXmlPath(index)"></panorama>
          </div>
        </div>
      </div>

      <!-- 底部功能区 -->
      <div class="w-full">
        <div class="mx-6 mb-6 shadow-md border border-solid border-gray-100 rounded-md">
          <div class="flex flex-row justify-between divide-x divide-gray-200 divide-solid ">
            <div class="flex flex-row justify-center ">
              <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4 ">
                <el-icon class="w-8 h-8" @click="router.go(-1)">
                  <Back />
                </el-icon>
              </div>
            </div>
            <div class="flex flex-row justify-center flex-grow">
              <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4"
                v-for="plugin in pluginList()" :key="plugin">
                <component :is="plugin.component.icon" class="w-8 h-8" @click="pluginClick(plugin)" />
              </div>
            </div>
            <div class="flex flex-row justify-center ">
              <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4">
                <el-icon class="w-8 h-8">
                  <Check />
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧插件容器 -->
    <!-- shadow-md border border-solid border-gray-100 rounded-md m-6 p-6 -->
    <div class="absolute right-14 top-32 " v-if="showPlugin">
      <component :is="activePlugin.component.dashboard" @groupClick="activePlugin.groupClick"
        @itemClick="activePlugin.click" @createGroup="activePlugin.createGroup" @create="activePlugin.create">
      </component>

      <component :is="activePlugin.component.groupEditForm" v-show="activePlugin.showGroupCreateForm"
        @update="activePlugin.updateGroup" :defaultData="activePlugin.activeGroupData"
        :field="activePlugin.groupUpdateField">
      </component>
      <component :is="activePlugin.component.groupCreateForm" v-show="activePlugin.showGroupUpdateForm"
        @store="activePlugin.storeGroup" :field="activePlugin.groupStoreField">
      </component>

      <component :is="activePlugin.component.editForm" v-show="activePlugin.showCreateForm"
        @update="activePlugin.update" :defaultData="activePlugin.activeData" :field="activePlugin.updateField">
      </component>
      <component :is="activePlugin.component.createForm" v-show="activePlugin.showUpdateForm"
        @store="activePlugin.store" :field="activePlugin.storeField">
      </component>

      <component :is="activePlugin.component.groupInfo" v-show="activePlugin.showGroupInfo"
        @editGroup="activePlugin.editGroup">
      </component>
      <component :is="activePlugin.component.info" v-show="activePlugin.showInfo" @edit="activePlugin.edit">
      </component>

    </div>
  </div>
</template>