<script setup>
import box from "@/components/box.vue"
import panoramaScene from "@/components/panoramaScene.vue"
import { computed, watch, ref, onMounted } from "vue";
import { useEditorStore } from "@/stores/editor";
import { v4 as uuid } from "uuid";
import * as api from "@/util/api";
import { useRoute, useRouter } from "vue-router";
import pluginCommon from "@/common/plugin.js"
import pluginBase from "@/views/works/editor/panorama/plugin/index.js"
import plugin from "./plugin.vue"
import infoIcon from "@/components/icon/panorama-info.vue"
import dashboardIcon from "@/components/icon/panorama-dashboard.vue"
import codeIcon from "@/components/icon/panorama-editor.vue"
import codeEditor from "./code.vue"


const pluginList = () => {
  let list = []
  let pluginBaseImpl = new pluginBase()
  for (let index in pluginCommon) {
    list.push(pluginBaseImpl.builder(pluginCommon[index]));
  }
  return list
}

const activeScene = computed(() => editorStore.activeScene)
const router = useRouter();
const activePlugin = ref({});
const showPlugin = ref(false);
const showCode = ref(false);
const panoId = uuid().split("-")[0]
const props = defineProps({
  sceneid: String,
});
const editorStore = useEditorStore();
const pluginClick = function (plugin) {
  activePlugin.value = plugin
  showPlugin.value = true
  editorStore.showDashboard()
}
watch(() => activePlugin, (val) => {
  console.log(val)
})

function toggleDashboard () {
  editorStore.toggleDashboard()
}
function toggleCode () {
  showCode.value = !showCode.value
}
function toggleInfo () {
  editorStore.toggleInfo()
}
function saveWork () {
  editorStore.updateWork()
}

</script>
<template>
  <div class="static">

    <div class="w-full h-full flex flex-col">
      <div class="flex flex-row flex-grow ">
        <div class="w-full flex-grow " id="panoramaBox">
          <div class="border border-solid border-gray-100 shadow-md rounded-md mt-1 ml-6  mr-2 p-2 flex-grow">
            <panorama-scene :info="activeScene"></panorama-scene>
          </div>
        </div>
        <div v-if="showPlugin" style="width:40rem;">
          <plugin :activePlugin="activePlugin"></plugin>
        </div>
      </div>

      <!-- 底部功能区 -->
      <div class="w-full">
        <div class="mx-6 mb-6 shadow-md border border-solid border-gray-100 rounded-md">
          <div class="flex flex-row justify-between divide-x divide-gray-200 divide-solid ">
            <!-- 返回按钮 -->
            <div class="flex flex-row justify-center ">
              <!-- <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4 ">
                <el-icon class="w-8 h-8" @click="router.go(-1)">
                  <Back />
                </el-icon>
              </div> -->
              <!-- <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4 " @click="toggleDashboard">
                <dashboard-icon class="w-8 h-8"></dashboard-icon>

              </div>
              <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4 " @click="toggleInfo">
                <info-icon class="w-8 h-8"></info-icon>
              </div> -->
              <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4 cursor-pointer"
                @click="toggleCode">
                <div class="w-8 h-8">
                <code-icon ></code-icon>
              </div>
              </div>
            </div>
            <!-- 插件列表 -->
            <div class="flex flex-row justify-center flex-grow">
              <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4 cursor-pointer"
                v-for="plugin in pluginList()" :key="plugin" @click="pluginClick(plugin)">
                <div class="w-8 h-8">
                  <component :is="plugin.component.icon"  />
                </div>
              </div>
            </div>
            <!-- 保存按钮 -->
            <div class="flex flex-row justify-center ">
              <div class="border border-solid border-gray-100 rounded-md  shadow-md m-4 p-4 cursor-pointer"
                @click="saveWork">
                <el-icon class="w-8 h-8">
                  <Check />
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCode">
      <code-editor></code-editor>
    </div>
  </div>
</template>