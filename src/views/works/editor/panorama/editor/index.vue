<script setup>
import box from "@/components/box.vue"
import panorama from "@/components/panorama.vue"
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import { v4 as uuid } from "uuid";
import * as api from "@/util/api";
import { useRoute, useRouter } from "vue-router";
import hostspotIcon from "@/views/works/editor/panorama/plugin/hotspot/icon.vue"

const router = useRouter();
const activePluginName = ref('');
const showPlugin = ref(false);
const panoId = uuid().split("-")[0]
const props = defineProps({
  sceneid: String,
});
const editorStore = useEditorStore();
const sceneGroup = computed(() => editorStore.sceneGroup)
const scene = computed(() => editorStore.scene)
const getXmlPath = (sceneId) => {
  if (editorList.value[sceneId] && editorList.value[sceneId].xml && editorList.value[sceneId].xml[0]) {
    return getUrl(editorList.value[sceneId].xml[0].path)
  } else {
    return ""
  }
}
function getUrl(url) {
  let arr = url.split("/");
  return api.assetUrl + arr[4] + "/" + arr[5];
}

const editorList = ref({});
watch(() => props.sceneid, function (sceneId) {
  if (!editorList.value[sceneId]) {
    editorList.value[sceneId] = scene.value[sceneId]
  }
}, {
  immediate: true,
})


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
              <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4">
                <hostspot-icon class="w-8 h-8"></hostspot-icon>
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
    <div class="absolute right-6 top-40 shadow-md border border-solid border-gray-100 rounded-md m-6 p-6"
      v-show="showPlugin">
      <components :is="activePluginName" />
    </div>
  </div>
</template>