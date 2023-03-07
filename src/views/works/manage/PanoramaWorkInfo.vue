<script setup>
import { computed, watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import box from "@/components/box.vue"
import { useEditorStore } from "@/stores/editor";
import { v4 as uuid } from "uuid";
import { CirclePlus, Plus } from "@element-plus/icons-vue";
import * as api from "@/util/api";
import http from "@/util/http";
import axios from "axios";
import * as panoramaType from "@/common/panoramaType.js"

const editorStore = useEditorStore();
const route = useRoute();
const router = useRouter();
const props = defineProps({
  workid: String,
});
onMounted(() => {
  editorStore.getPanorama(props.workid);
})
const work = computed(() => editorStore.work, function () {
  return editorStore.work
})
const scenes = computed(() => editorStore.scene, function () {
  return editorStore.scene
})

const sceneGroups = computed(() => editorStore.sceneGroup, function () {
  return editorStore.sceneGroup
})

const createSceneGroupForm = ref({
  name: undefined
})
const createSceneGroupDialogVisible = ref(false)
const createSceneForm = ref({
  group_id: ""
})
const createSceneDialogVisible = ref(false)


const loadPanorama = function (node, resolve) {
  if (node.level === 0) {
    http()
      .get(api.host + api.panorama + "?filter[type]=" + panoramaType.STOREHOUSE)
      .then((res) => {
        let respond = res.data;
        if (respond.code == 200) {
          let data = [];
          for (let item in respond.data.data) {
            if (respond.data.data[item].type == panoramaType.STOREHOUSE) {
              data.push({
                name: respond.data.data[item].name,
                hashId: respond.data.data[item].hash_id,
                purpose: respond.data.data[item].purpose,
                type: respond.data.data[item].type,
              });
            }
          }
          return resolve(data);
        }
      });
  } else {
    http()
      .get(
        api.host +
        api.panorama +
        "?filter[parent_id]=" +
        node.data.hashId +
        "&include=xml,thumb"
      )
      .then((res) => {
        let respond = res.data;
        if (respond.code == 200) {
          let data = [];
          let fileList = [];
          for (let item in respond.data.data) {
            if (respond.data.data[item].type == panoramaType.FOLDER) {
              data.push({
                name: respond.data.data[item].name,
                hashId: respond.data.data[item].hash_id,
                purpose: respond.data.data[item].purpose,
                type: respond.data.data[item].type,
              });
            } else if (respond.data.data[item].type == panoramaType.ASSET) {
              panoramaInfo.value[respond.data.data[item].hash_id] =
                respond.data.data[item];
              fileList.push({
                name: respond.data.data[item].name,
                hashId: respond.data.data[item].hash_id,
                purpose: respond.data.data[item].purpose,
                type: respond.data.data[item].type,
              });
            }
          }
          treePanoramaList.value[node.data.hashId] = fileList;
          return resolve(data);
        }
      });
  }
}
const panoramaTreeProps = ref({
  label: "name",
  children: "childFiles"
})
const panoramaTreeClick = function (node) {
  activeSelectPanoramaFolder.value = node;
}
const activeSelectPanoramaFolder = ref({})
const formPanoramaList = ref([])
const treePanoramaList = ref({})
const panoramaInfo = ref({})

function showPanoramaWork(id) {
  try {
    let features =
      "height=500, width=800, top=100, left=100, toolbar=no, menubar=no, scrollbars = no, resizable = no, location = no, status = no";
    window.open("/work/show/panorama/" + id, "全景作品预览", features);
  } catch (e) {
    console.log(e);
  }
}
function copyPanoramaWorkLink(id) {
  let url =
    window.location.protocol + "//" + window.location.host + "/work/show/panorama/" + id;
  copy(url);
}
function copy(str) {
  let transfer = document.createElement("input");
  document.body.appendChild(transfer);
  transfer.value = str; // 这里表示想要复制的内容
  transfer.focus();
  transfer.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
  }
  transfer.blur();
  console.log("复制成功");
  document.body.removeChild(transfer);
}

function checkoutScene(scene) {
  editorStore.setActiveScene(scene)
  router.push(`/work/editor/panorama/${scene.hash_id}`);
}
function removeScene(scene) {
  editorStore.delScene(scene.hash_id)
}
function removeSceneForGroup(scene, groupHashId) {
  editorStore.delScene(scene.hash_id)
}
function addSceneGroup() {
  console.log(createSceneGroupDialogVisible.value)
  createSceneGroupDialogVisible.value = true

}
function removeSceneGroup(groupHashId) {
  editorStore.delSceneGroup(groupHashId)
}
function storeSceneGroup() {
  if (!createSceneGroupForm.value.name) return
  let data = {
    hash_id: uuid().split("-")[0],
    name: createSceneGroupForm.value.name,
    plugin: "panorama-scene"
  }
  editorStore.addSceneGroup(data)
  createSceneGroupDialogVisible.value = false
}
function closeAddSceneGroup() {
  createSceneGroupDialogVisible.value = false
  createSceneGroupForm.value = { name: undefined }
}

function storeScene() {
  let data = {}
  getPanoramaInfo(formPanoramaList.value).map((panorama) => {
    if (!data[panorama.hash_id]) {
      panorama.plugin = 'panorama-scene'
      if (createSceneForm.value.group_id) {
        panorama.group_id = createSceneForm.value.group_id
      }
      data[panorama.hash_id] = panorama
    }
  })
  editorStore.addScene(data)
  createSceneDialogVisible.value = false
}
function getPanoramaInfo(form) {
  let data = []
  form.map((item) => {
    data.push(panoramaInfo.value[item])
  })
  return data;
}
function closeAddScene() {

}
function createScene() {
  createSceneDialogVisible.value = true
}
function createSceneByGroup(sceneGroupHashId = "") {
  if (sceneGroupHashId) {
    createSceneForm.value.group_id = sceneGroupHashId
  }
  createSceneDialogVisible.value = true
}
async function textToStringAndDownload(name, workId) {

  // 要保存的字符串
  let res = await axios.create({
    baseURL: api.host,
  }).get(
    api.panoramaWork + 'getDocument/' + workId
  )
  let stringData = res.data
  console.log(stringData)
  // dada 表示要转换的字符串数据，type 表示要转换的数据格式
  let blob = new Blob([stringData], {
    type: "text/plain;charset=utf-8"
  })
  // 根据 blob生成 url链接
  let objectURL = URL.createObjectURL(blob)

  // 创建一个 a 标签Tag
  let aTag = document.createElement('a')
  // 设置文件的下载地址
  aTag.href = objectURL
  // 设置保存后的文件名称
  aTag.download = `${name}.xml`
  // 给 a 标签添加点击事件
  aTag.click()
  // 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
  // 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
  URL.revokeObjectURL(objectURL)
}

</script>
<template>
  <div class="w-full h-full">
    <div class="flex flex-row">
      <box class="w-full" size="md">
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <div class="flex-grow">
              <div class="text-2xl font-bold">{{ work.name }}</div>
              <div class="text-base mt-4">{{ work.info }}</div>
            </div>
            <div>
              <el-image class="w-32 h-32 rounded-md"></el-image>
            </div>
          </div>
          <div class="flex flex-row justify-between mt-6">
            <div class="flex flex-row justify-left">
              <el-link type="primary" @click="showPanoramaWork(work.hash_id)">预览</el-link>
              <el-link type="primary" @click="copyPanoramaWorkLink(work.hash_id)" class="ml-2">复制预览地址</el-link>
              <el-link type="primary" @click="textToStringAndDownload(work.name, work.hash_id)"
                class="ml-2">下载xml</el-link>
            </div>
            <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
          </div>
        </div>
      </box>
      <box class="w-full" size="md">
        <div class="text-lg font-bold pb-2">访问统计</div>
      </box>
    </div>
    <div>
      <box size="md">
        <div class="text-lg font-bold pb-2">场景列表</div>
        <el-tabs class="demo-tabs" :addable="true" @tab-add="addSceneGroup" @tab-remove="removeSceneGroup">
          <el-tab-pane label="所有场景" name="all" class="flex flex-row flex-wrap" :closable="false">
            <box size="xs" class="h-26 w-24" @click="createScene">
              <div class="w-full h-full flex flex-col justify-center">
                <div class="w-full flex flex-row justify-center">
                  <Plus class="w-8 h-8"></Plus>
                </div>
              </div>
            </box>
            <box size="xs" v-for="scene in scenes" :key="scene" class="w-96">
              <div class="flex flex-col ">
                <div class="flex flex-row justify-between ">
                  <div class="flex-grow">
                    <div class="text-base font-bold w-48">{{ scene.name }}</div>
                  </div>
                  <div>
                    <el-image class="w-32 h-16 rounded-md" :src="scene.thumb[0].path"></el-image>
                  </div>
                </div>
                <div class="flex flex-row justify-between mt-6">
                  <div class="flex flex-row">
                    <el-link type="primary" class="mx-1" @click="checkoutScene(scene)">编辑</el-link>
                    <el-link type="danger" class="mx-1" @click="removeScene(scene)">移除</el-link>
                  </div>
                  <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
                </div>
              </div>
            </box>
          </el-tab-pane>
          <el-tab-pane :label="sceneGroup.name" :name="sceneGroupHashId" :closable="true" class="flex flex-row flex-wrap"
            v-for="(sceneGroup, sceneGroupHashId) in sceneGroups" :key="sceneGroupHashId">
            <box size="xs" class="h-26 w-24" @click="createSceneByGroup(sceneGroupHashId)">
              <div class="w-full h-full flex flex-col justify-center">
                <div class="w-full flex flex-row justify-center">
                  <Plus class="w-8 h-8"></Plus>
                </div>
              </div>
            </box>
            <box size="xs" v-for="sceneHashId in sceneGroup.scenes" :key="sceneHashId" class="w-96">
              <div class="flex flex-col ">
                <div class="flex flex-row justify-between ">
                  <div class="flex-grow">
                    <div class="text-base font-bold w-48">{{ scenes[sceneHashId].name }}</div>
                  </div>
                  <div>
                    <el-image class="w-32 h-16 rounded-md" :src="scenes[sceneHashId].thumb[0].path"></el-image>
                  </div>
                </div>
                <div class="flex flex-row justify-between mt-6">
                  <div class="flex flex-row">
                    <el-link type="primary" class="mx-1" @click="checkoutScene(scenes[sceneHashId])">编辑</el-link>
                    <el-link type="danger" class="mx-1"
                      @click="removeSceneForGroup(scenes[sceneHashId], sceneGroupHashId)">移除</el-link>
                  </div>
                  <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
                </div>
              </div>
            </box>

          </el-tab-pane>
        </el-tabs>
      </box>
    </div>
    <el-dialog v-model="createSceneGroupDialogVisible" title="新增场景分组">
      <el-form :model="createSceneGroupForm">
        <el-form-item label="分组名称:">
          <el-input v-model="createSceneGroupForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeAddSceneGroup">取消</el-button>
          <el-button type="primary" @click="storeSceneGroup">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="createSceneDialogVisible" title="新增场景">
      <box size="xs">
        <div class="flex flex-row justify-between" style="height: 300px">
          <el-tree :props="panoramaTreeProps" :load="loadPanorama" lazy ref="treeRef" class="flex flex-grow"
            @node-click="panoramaTreeClick" />
          <div class="shadow-inner p-2 m-2 overflow-y-auto" style="width: 300px">
            <div v-if="
              activeSelectPanoramaFolder.hashId &&
              treePanoramaList[activeSelectPanoramaFolder.hashId] &&
              treePanoramaList[activeSelectPanoramaFolder.hashId].length > 0
            " class="w-full">
              <el-checkbox-group v-model="formPanoramaList" class="flex flex-col">
                <el-checkbox :label="panorama.hashId" size="large" v-for="panorama in treePanoramaList[
                  activeSelectPanoramaFolder.hashId
                ]" :key="panorama">
                  {{ panorama.name }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <el-empty v-else />
          </div>
        </div>
        <span>
          <el-button size="small" @click="closeAddScene">取消</el-button>
          <el-button type="primary" size="small" @click="storeScene">确定</el-button>
        </span>
      </box>
    </el-dialog>
  </div>
</template>