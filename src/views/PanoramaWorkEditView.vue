<script setup>
import BaseEdit from "../components/base-editor.vue";
import { onActivated, onMounted, watch, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { Plus, Edit } from "@element-plus/icons-vue";
import * as api from "../util/api";
import http from "@/util/http";
import { v4 as uuid } from "uuid";
import JsonFormatter from "json-string-formatter";
import { normalize, schema } from 'normalizr'



const authStore = useAuthStore();
const router = useRouter();
const props = defineProps({
  id: String,
});
/**
 * 一些全局变量
 */
const prviewStyle = ref({});
const krpano = ref({});
const panorama = ref({});
const panoramaTreeProps = ref({
  label: "name",
  children: "childFiles",
});

/**
 * 组件状态
 */
const rightFormType = ref();
const rightFormStatus = ref("list");
const contentStatus = ref('prview')
const leftMenuIsCollapse = ref(false);
const showSelectPanoramaDialogVisible = ref(false);
const showCreatePanoramaGroupDialogVisible = ref(false);

/**
 * 新增表单
 */
const formPanoramaList = ref([]);
const formPanoramaGroup = ref({});
const formFlagGroup = ref({
  name: "",
});
const formFlag = ref({
  name: "",
});
const formSimpleHotspot = ref({
  name: "",
});
const formImgHotspot = ref({
  name: "",
});
const formView = ref({
  name: "",
});
const formButton = ref({
  name: "",
});
const formText = ref({
  text: "",
});
const editString = ref("")

/**
 * 待定 暂时没有研究好
 */
// const workEntity = new schema.Entity('work')
// const panoramaGroupEntity = new schema.Entity('panoramaGroup')
// const panoramaEntity = new schema.Entity('panorama')
// const flagGroupEntity = new schema.Entity('flagGroup')
// const flagEntity = new schema.Entity('flag')
// const simpleHotspotEntity = new schema.Entity('simpleHotspot')
// const imgHotspotEntity = new schema.Entity('imgHotspot')
// const viewEntity = new schema.Entity('view')
// const buttonEntity = new schema.Entity('button')
// const textEntity = new schema.Entity('text')


/**
 * 全局的场景信息和作品信息
 */
const treePanoramaList = ref({});
const panoramaInfo = ref({});
const workOption = ref({
  work: {},
  panoramaGroup: {},
  panorama: {},
  flagGroup: {},
  flag: {},
  simpleHotspot: {},
  imgHotspot: {},
  view: {},
  button: {},
  text: {},
});

/**
 * 选中的元素对象
 */
const activeSelectPanoramaFolder = ref({});
const activePanoramaGroup = ref({});
const activePanorama = ref({});
const activeFlagGroup = ref({});
const activeFlag = ref({});
const activeSimpleHotspot = ref({});
const activeImgHotspot = ref({});
const activeView = ref({});
const activeButton = ref({});
const activeText = ref({});


onMounted(() => {
  setPrviewSize();
  initPanorama();
  window.addEventListener("contentResize", function () {
    setPrviewSize();
  });
  http()
    .get(api.host + api.panoramaWork + props.id)
    .then((res) => {
      panoramaWork.value = res.data.data;
    });
});
watch(
  () => authStore.isAuth,
  (isAuth) => {
    if (!isAuth) {
      router.push("/login");
    }
  },
  {
    immediate: true,
  }
);
watch(activePanorama, (activePanorama) => {
  showPanorama(getUrl(activePanorama.xml[0].path));
});


function panoramaTreeClick (node) {
  activeSelectPanoramaFolder.value = node;
}

function updateEditString () {
  editString.value = JsonFormatter.format(JSON.stringify(workOption.value))
  console.log(editString.value)
}
/**
 * 设置全景可展示区域的大小
 */
function setPrviewSize () {
  prviewStyle.value = {
    width: document.getElementById("base-editor-content").offsetWidth + "px",
    height: document.getElementById("base-editor-content").offsetHeight + "px",
  };
}

/**
 * 切换需要展示的全景
 * @param {*} xmlPath
 */
function showPanorama (xmlPath) {
  document.getElementById("prview").innerHTML = "";
  embedpano({
    swf: "/krpano/tour.swf",
    xml: "/krpano/tour.xml",
    target: "prview",
    html5: "auto",
    mobilescale: 1.0,
    passQueryParameters: true,
    initvars: { xmlPath: xmlPath },
    onready: krpanoReady,
    consolelog: true,
  });
}

/**
 * 初始化一个 panorama helper
 */
function initPanorama () {
  document.getElementById("prview").innerHTML = "";
  embedpano({
    swf: "/krpano/tour.swf",
    xml: "/krpano/test.xml",
    target: "prview",
    html5: "auto",
    mobilescale: 1.0,
    passQueryParameters: true,
    onready: krpanoReady,
    consolelog: true,
  });
}

/**
 * krpano 就绪事件
 * @param {*} krpano
 */
function krpanoReady (krpano) {
  krpano.value = krpano;
}

/**
 * 新增一个场景分组
 */
function addSceneGroup () {
  showCreatePanoramaGroupDialogVisible.value = true;
}

/**
 * 新增全景时候 tree load
 * @param {*} node
 * @param {*} resolve
 */
function loadPanorama (node, resolve) {
  if (node.level === 0) {
    http()
      .get(api.host + api.panorama + "?filter[type]=2")
      .then((res) => {
        let respond = res.data;
        if (respond.code == 200) {
          let data = [];
          for (let item in respond.data.data) {
            if (respond.data.data[item].type == 2) {
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
            if (respond.data.data[item].type == 1) {
              data.push({
                name: respond.data.data[item].name,
                hashId: respond.data.data[item].hash_id,
                purpose: respond.data.data[item].purpose,
                type: respond.data.data[item].type,
              });
            } else if (respond.data.data[item].type == 0) {
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

/**
 * 设置当前选中的 panorama
 * @param {*} active
 */
function setActivePanorama (active) {
  // editFormPanorama.value = active;
  activePanorama.value = active;
  rightFormType.value = "panorama";
}
function setActivePanoramaGroup (context, event) {
  let name = context.paneName;
  activePanoramaGroup.value = workOption.value.panoramaGroup[name];
  rightFormType.value = "panoramaGroup";
}
/**
 * 新增场景分组
 */
function storeSceneGroup () {
  let u = uuid().split("-")[0];
  workOption.value.panoramaGroup[u] = {
    uuid: u,
    name: formPanoramaGroup.value.name,
    panoramas: [],
  };
  activePanoramaGroup.value = workOption.value.panoramaGroup[u];
  showCreatePanoramaGroupDialogVisible.value = false;
  formPanoramaGroup.value.name = "";
  rightFormType.value = "panoramaGroup";
  updateEditString()
}

/**
 * 场景中的元素
 */
function storeFlagGroup () {
  let u = uuid().split("-")[0];
  workOption.value.flagGroup[u] = {
    uuid: u,
    name: formFlagGroup.value.name,
    flags: [],
  };
  activePanorama.value.flagGroups.push(u);
  workOption.value.panorama[activePanorama.value.hash_id] =
    activePanorama.value;
  rightFormStatus.value = "list";
  updateEditString()
}
function storeFlag () {
  let u = uuid().split("-")[0];
  workOption.value.flag[u] = {
    uuid: u,
    name: formFlag.value.name,
  };
  activePanorama.value.flags.push(u);
  workOption.value.panorama[activePanorama.value.hash_id] =
    activePanorama.value;
  rightFormStatus.value = "list";
  updateEditString()
}
function storeSimpleHotspot () {
  let u = uuid().split("-")[0];
  workOption.value.simpleHotspot[u] = {
    uuid: u,
    name: formSimpleHotspot.value.name,
  };
  activePanorama.value.simpleHotspots.push(u);
  workOption.value.panorama[activePanorama.value.hash_id] =
    activePanorama.value;
  rightFormStatus.value = "list";
  updateEditString()
}
function storeImgHotspot () {
  let u = uuid().split("-")[0];
  workOption.value.imgHotspot[u] = {
    uuid: u,
    name: formImgHotspot.value.name,
  };
  activePanorama.value.imgHotspots.push(u);
  workOption.value.panorama[activePanorama.value.hash_id] =
    activePanorama.value;
  rightFormStatus.value = "list";
  updateEditString()
}
function storeView () {
  let u = uuid().split("-")[0];
  workOption.value.view[u] = {
    uuid: u,
    name: formView.value.name,
  };
  activePanorama.value.views.push(u);
  workOption.value.panorama[activePanorama.value.hash_id] =
    activePanorama.value;
  rightFormStatus.value = "list";
  updateEditString()
}
function storeButton () {
  let u = uuid().split("-")[0];
  workOption.value.button[u] = {
    uuid: u,
    name: formButton.value.name,
  };
  activePanorama.value.buttons.push(u);
  workOption.value.panorama[activePanorama.value.hash_id] =
    activePanorama.value;
  rightFormStatus.value = "list";
  updateEditString()
}
function storeText () {
  let u = uuid().split("-")[0];
  workOption.value.text[u] = {
    uuid: u,
    name: formText.value.name,
  };
  activePanorama.value.texts.push(u);
  workOption.value.panorama[activePanorama.value.hash_id] =
    activePanorama.value;
  rightFormStatus.value = "list";
  updateEditString()
}

function editChange (text) {
  workOption.value = JSON.parse(text)
}
function updateFlagGroup () {
  workOption.value.flagGroup[activeFlagGroup.value.uuid] = activeFlagGroup.value
  rightFormStatus.value = 'list'
  updateEditString()
}
function updateFlag () {
  workOption.value.flag[activeFlag.value.uuid] = activeFlag.value
  rightFormStatus.value = 'list'
  updateEditString()
}
function updateSimpleHotspot () {
  workOption.value.simpleHotspot[activeSimpleHotspot.value.uuid] = activeSimpleHotspot.value
  rightFormStatus.value = 'list'
  updateEditString()
}
function updateImgHotspot () {
  workOption.value.imgHotspot[activeImgHotspot.value.uuid] = activeImgHotspot.value
  rightFormStatus.value = 'list'
  updateEditString()
}
function updateView () {
  workOption.value.view[activeView.value.uuid] = activeView.value
  rightFormStatus.value = 'list'
  updateEditString()
}
function updateButton () {
  workOption.value.button[activeButton.value.uuid] = activeButton.value
  rightFormStatus.value = 'list'
  updateEditString()
}
function updateText () {
  workOption.value.text[activeText.value.uuid] = activeText.value
  rightFormStatus.value = 'list'
  updateEditString()
}



/**
 * 当前选中全景修改所属分组时, 需要的状态切换
 * @param {*} val
 */
function panoramaGroupChange (val) {
  activePanoramaGroup.value.panoramas.splice(
    activePanoramaGroup.value.panoramas.indexOf(activePanorama.value.hash_id),
    1
  );
  workOption.value.panoramaGroup[
    activePanoramaGroup.value.uuid
  ].panoramas.splice(
    workOption.value.panoramaGroup[
      activePanoramaGroup.value.uuid
    ].panoramas.indexOf(activePanorama.value.hash_id),
    1
  );

  workOption.value.panoramaGroup[val].panoramas.push(
    activePanorama.value.hash_id
  );
  updateEditString()
}

/**
 * 往场景分组中添加场景
 */
function storeScene () {
  // 如果 workOption 中没有全景分组信息, 那么先创建一个默认分组
  if (Object.keys(workOption.value.panoramaGroup).length == 0) {
    // 先加入list
    let u = uuid().split("-")[0];
    workOption.value.panoramaGroup[u] = {
      uuid: u,
      name: "默认分组",
      panoramas: [],
    };
    activePanoramaGroup.value = workOption.value.panoramaGroup[u];
  }

  workOption.value.panoramaGroup[
    activePanoramaGroup.value.uuid
  ].panoramas.push.apply(
    workOption.value.panoramaGroup[activePanoramaGroup.value.uuid].panoramas,
    formPanoramaList.value
  );

  /**
   * 最后将全景图加入到全景列表
   */
  for (let i = 0; i < formPanoramaList.value.length; i++) {
    workOption.value.panorama[formPanoramaList.value[i]] = Object.assign(
      panoramaInfo.value[formPanoramaList.value[i]],
      {
        panoramaGroupUuid: activePanoramaGroup.value.uuid,
        flagGroups: [],
        flags: [],
        simpleHotspots: [],
        imgHotspots: [],
        views: [],
        buttons: [],
        texts: [],
      }
    );
  }

  /**
   * 最后隐藏全景图选择器
   */
  formPanoramaList.value = [];
  showSelectPanoramaDialogVisible.value = false;
  updateEditString()
}


/**
 * util 相关, 获取资源的 url
 * @param {*} url
 */
function getUrl (url) {
  let arr = url.split("/");
  return api.assetUrl + arr[4] + "/" + arr[5];
}
</script>
<template>
  <div>
    <BaseEdit>
      <template #header>
        <div class="flex flex-row"></div>
      </template>
      <template #left>
        <el-menu class="h-full" :collapse="leftMenuIsCollapse" @open="handleOpen" @close="handleClose">
          <el-sub-menu index="1">
            <template #title>
              <span>标牌热点</span>
            </template>
            <el-menu-item-group title="标牌">
              <el-menu-item index="1-1" @click="rightFormType = 'flagGroup'">分组</el-menu-item>
              <el-menu-item index="1-2" @click="rightFormType = 'flag'">标牌</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="热点">
              <el-menu-item index="1-3" @click="rightFormType = 'simpleHotspot'">普通热点</el-menu-item>
              <el-menu-item index="1-4" @click="rightFormType = 'imgHotspot'">图片热点</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>场景视角</span>
            </template>
            <el-menu-item-group title="视角">
              <el-menu-item index="2-1" @click="rightFormType = 'view'">静态视角</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>其他</span>
            </template>
            <el-menu-item-group title="其他">
              <el-menu-item index="3-1" @click="rightFormType = 'button'">按钮</el-menu-item>
              <el-menu-item index="3-2" @click="rightFormType = 'text'">文本</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </template>
      <template #right>
        <div class="m-2">
          <div v-if="rightFormType == 'panorama'" class="flex flex-col divide-y divide-gray-300 divide-solid">
            <div class="m-2 text-xl">场景信息</div>
            <el-form class="m-2 pt-4">
              <el-form-item label="场景名称">
                <el-input v-model="activePanorama.name" />
              </el-form-item>
              <el-form-item label="场景所属分组">
                <el-select v-model="activePanorama.panoramaGroupUuid" @change="panoramaGroupChange">
                  <el-option v-for="(group, uuid) in workOption.panoramaGroup" :key="uuid" :value="uuid"
                    :label="group.name">
                    {{ group.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div v-else-if="rightFormType == 'panoramaGroup'" class="flex flex-col divide-y divide-gray-300 divide-solid">
            <div class="m-2 text-xl">场景分组信息</div>
            <el-form class="m-2 pt-4">
              <el-form-item label="场景分组名称">
                <el-input v-model="activePanoramaGroup.name" />
              </el-form-item>
            </el-form>
          </div>
          <div v-else-if="rightFormType == 'flagGroup'" class="flex flex-col divide-y divide-gray-300 divide-solid">
            <div class="flex flex-row justify-between">
              <div class="m-2 text-xl">标牌分组</div>
              <div class="flex flex-col justify-center mr-2" v-show="Object.keys(activePanorama).length > 0">
                <el-icon class="border border-gray-300 border-solid p-2 rounded-md" @click="rightFormStatus = 'create'">
                  <Plus />
                </el-icon>
              </div>
            </div>
            <div v-if="rightFormStatus == 'list'" class="m-2 pt-4">
              <div v-for="flagGroup in activePanorama.flagGroups" :key="flagGroup" v-show="
                activePanorama.flagGroups &&
                activePanorama.flagGroups.length > 0
              ">
                <div class="border border-gray-200 border-solid p-2 shadow rounded flex flex-row justify-between">
                  <div class="flex flex-col justify-center">
                    <div>{{ workOption.flagGroup[flagGroup].name }}</div>
                  </div>
                  <div>
                    <el-icon class="border border-gray-300 border-solid p-1 rounded-md"
                      @click="activeFlagGroup = workOption.flagGroup[flagGroup], rightFormStatus = 'edit'">
                      <Edit />
                    </el-icon>
                  </div>
                </div>
              </div>
              <div v-show="
                !activePanorama.flagGroups ||
                activePanorama.flagGroups.length == 0
              ">
                <el-empty />
              </div>
            </div>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'create'">
              <el-form-item label="标牌分组名称">
                <el-input v-model="formFlagGroup.name" />
              </el-form-item>
              <el-button class="w-full" @click="storeFlagGroup">保存</el-button>
            </el-form>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'edit'">
              <el-form-item label="标牌分组名称">
                <el-input v-model="activeFlagGroup.name" />
              </el-form-item>
              <el-button class="w-full" @click="updateFlagGroup">保存</el-button>
            </el-form>
          </div>
          <div v-else-if="rightFormType == 'flag'" class="flex flex-col divide-y divide-gray-300 divide-solid">
            <div class="flex flex-row justify-between">
              <div class="m-2 text-xl">标牌</div>
              <div class="flex flex-col justify-center mr-2" v-show="Object.keys(activePanorama).length > 0">
                <el-icon class="border border-gray-300 border-solid p-2 rounded-md" @click="rightFormStatus = 'create'">
                  <Plus />
                </el-icon>
              </div>
            </div>
            <div v-if="rightFormStatus == 'list'" class="m-2 pt-4">
              <div v-for="flag in activePanorama.flags" :key="flag"
                v-show="activePanorama.flags && activePanorama.flags.length > 0">
                <div class="border border-gray-200 border-solid p-2 shadow rounded flex flex-row justify-between">
                  <div class="flex flex-col justify-center">
                    <div>{{ workOption.flag[flag].name }}</div>
                  </div>
                  <div>
                    <el-icon class="border border-gray-300 border-solid p-1 rounded-md"
                      @click="activeFlag = workOption.flag[flag], rightFormStatus = 'edit'">
                      <Edit />
                    </el-icon>
                  </div>
                </div>
              </div>
              <div v-show="
                !activePanorama.flags || activePanorama.flags.length == 0
              ">
                <el-empty />
              </div>
            </div>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'create'">
              <el-form-item label="标牌名称">
                <el-input v-model="formFlag.name" />
              </el-form-item>
              <el-form-item v-show="activePanorama.flagGroups.length > 0" label="标牌名称">
                <el-select v-model="formFlag.flageGroupUuid">
                  <el-option v-for="group in activePanorama.flagGroups" :key="group" :value="group"
                    :label="workOption.flagGroup[group].name">
                    {{ workOption.flagGroup[group].name }}
                  </el-option>
                </el-select>
              </el-form-item>
              <el-button class="w-full" @click="storeFlag">保存</el-button>
            </el-form>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'edit'">
              <el-form-item label="标牌名称">
                <el-input v-model="activeFlag.name" />
              </el-form-item>
              <el-form-item v-show="activePanorama.flagGroups.length > 0" label="标牌名称">
                <el-select v-model="activeFlag.flageGroupUuid">
                  <el-option v-for="group in activePanorama.flagGroups" :key="group" :value="group"
                    :label="workOption.flagGroup[group].name">
                    {{ workOption.flagGroup[group].name }}
                  </el-option>
                </el-select>
              </el-form-item>
              <el-button class="w-full" @click="updateFlag">保存</el-button>
            </el-form>
          </div>
          <div v-else-if="rightFormType == 'simpleHotspot'" class="flex flex-col divide-y divide-gray-300 divide-solid">
            <div class="flex flex-row justify-between">
              <div class="m-2 text-xl">热点</div>
              <div class="flex flex-col justify-center mr-2" v-show="Object.keys(activePanorama).length > 0">
                <el-icon class="border border-gray-300 border-solid p-2 rounded-md" @click="rightFormStatus = 'create'">
                  <Plus />
                </el-icon>
              </div>
            </div>
            <div v-if="rightFormStatus == 'list'" class="m-2 pt-4">
              <div v-for="simpleHotspot in activePanorama.simpleHotspots" :key="simpleHotspot" v-show="
                activePanorama.simpleHotspots &&
                activePanorama.simpleHotspots.length > 0
              ">
                <div class="border border-gray-200 border-solid p-2 shadow rounded flex flex-row justify-between">
                  <div class="flex flex-col justify-center">
                    <div>
                      {{ workOption.simpleHotspot[simpleHotspot].name }}
                    </div>
                  </div>
                  <div>
                    <el-icon class="border border-gray-300 border-solid p-1 rounded-md"
                      @click="activeSimpleHotspot = workOption.simpleHotspot[simpleHotspot], rightFormStatus = 'edit'">
                      <Edit />
                    </el-icon>
                  </div>
                </div>
              </div>
              <div v-show="
                !activePanorama.simpleHotspots ||
                activePanorama.simpleHotspots.length == 0
              ">
                <el-empty />
              </div>
            </div>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'create'">
              <el-form-item label="热点名称">
                <el-input v-model="formSimpleHotspot.name" />
              </el-form-item>
              <el-button class="w-full" @click="storeSimpleHotspot">保存</el-button>
            </el-form>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'edit'">
              <el-form-item label="热点名称">
                <el-input v-model="activeHotspot.name" />
              </el-form-item>
              <el-button class="w-full" @click="updateSimpleHotspot">保存</el-button>
            </el-form>
          </div>
          <div v-else-if="rightFormType == 'imgHotspot'" class="flex flex-col divide-y divide-gray-300 divide-solid">
            <div class="flex flex-row justify-between">
              <div class="m-2 text-xl">图片热点</div>
              <div class="flex flex-col justify-center mr-2" v-show="Object.keys(activePanorama).length > 0">
                <el-icon class="border border-gray-300 border-solid p-2 rounded-md" @click="rightFormStatus = 'create'">
                  <Plus />
                </el-icon>
              </div>
            </div>
            <div v-if="rightFormStatus == 'list'" class="m-2 pt-4">
              <div v-for="imgHotspot in activePanorama.imgHotspots" :key="imgHotspot" v-show="
                activePanorama.imgHotspots &&
                activePanorama.imgHotspots.length > 0
              ">
                <div class="border border-gray-200 border-solid p-2 shadow rounded flex flex-row justify-between">
                  <div class="flex flex-col justify-center">
                    <div>{{ workOption.imgHotspot[imgHotspot].name }}</div>
                  </div>
                  <div>
                    <el-icon class="border border-gray-300 border-solid p-1 rounded-md"
                      @click="activeImgHotspot = workOption.imgHotspot[imgHotspot], rightFormStatus = 'edit'">
                      <Edit />
                    </el-icon>
                  </div>
                </div>
              </div>
              <div v-show="
                !activePanorama.imgHotspots ||
                activePanorama.imgHotspots.length == 0
              ">
                <el-empty />
              </div>
            </div>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'create'">
              <el-form-item label="热点名称">
                <el-input v-model="formImgHotspot.name" />
              </el-form-item>
              <el-button class="w-full" @click="storeImgHotspot">保存</el-button>
            </el-form>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'edit'">
              <el-form-item label="热点名称">
                <el-input v-model="activeImgHotspot.name" />
              </el-form-item>
              <el-button class="w-full" @click="updateImgHotspot">保存</el-button>
            </el-form>
          </div>
          <div v-else-if="rightFormType == 'view'" class="flex flex-col divide-y divide-gray-300 divide-solid">
            <div class="flex flex-row justify-between">
              <div class="m-2 text-xl">视角</div>
              <div class="flex flex-col justify-center mr-2" v-show="Object.keys(activePanorama).length > 0">
                <el-icon class="border border-gray-300 border-solid p-2 rounded-md" @click="rightFormStatus = 'create'">
                  <Plus />
                </el-icon>
              </div>
            </div>
            <div v-if="rightFormStatus == 'list'" class="m-2 pt-4">
              <div v-for="view in activePanorama.views" :key="view"
                v-show="activePanorama.views && activePanorama.views.length > 0">
                <div class="border border-gray-200 border-solid p-2 shadow rounded flex flex-row justify-between">
                  <div class="flex flex-col justify-center">
                    <div>{{ workOption.view[view].name }}</div>
                  </div>
                  <div>
                    <el-icon class="border border-gray-300 border-solid p-1 rounded-md"
                      @click="activeView = workOption.view[view], rightFormStatus = 'edit'">
                      <Edit />
                    </el-icon>
                  </div>
                </div>
              </div>
              <div v-show="
                !activePanorama.views || activePanorama.views.length == 0
              ">
                <el-empty />
              </div>
            </div>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'create'">
              <el-form-item label="视角名称">
                <el-input v-model="formView.name" />
              </el-form-item>
              <el-button class="w-full" @click="storeView">保存</el-button>
            </el-form>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'edit'">
              <el-form-item label="视角名称">
                <el-input v-model="activeView.name" />
              </el-form-item>
              <el-button class="w-full" @click="updateView">保存</el-button>
            </el-form>
          </div>
          <div v-else-if="rightFormType == 'button'" class="flex flex-col divide-y divide-gray-300 divide-solid">
            <div class="flex flex-row justify-between">
              <div class="m-2 text-xl">按钮</div>
              <div class="flex flex-col justify-center mr-2" v-show="Object.keys(activePanorama).length > 0">
                <el-icon class="border border-gray-300 border-solid p-2 rounded-md" @click="rightFormStatus = 'create'">
                  <Plus />
                </el-icon>
              </div>
            </div>
            <div v-if="rightFormStatus == 'list'" class="m-2 pt-4">
              <div v-for="button in activePanorama.buttons" :key="button" v-show="
                activePanorama.buttons && activePanorama.buttons.length > 0
              ">
                <div class="border border-gray-200 border-solid p-2 shadow rounded flex flex-row justify-between">
                  <div class="flex flex-col justify-center">
                    <div>{{ workOption.button[button].name }}</div>
                  </div>
                  <div>
                    <el-icon class="border border-gray-300 border-solid p-1 rounded-md"
                      @click="activeButton = workOption.button[button], rightFormStatus = 'edit'">
                      <Edit />
                    </el-icon>
                  </div>
                </div>
              </div>
              <div v-show="
                !activePanorama.buttons || activePanorama.buttons.length == 0
              ">
                <el-empty />
              </div>
            </div>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'create'">
              <el-form-item label="按钮名称">
                <el-input v-model="formButton.name" />
              </el-form-item>
              <el-button class="w-full" @click="storeButton">保存</el-button>
            </el-form>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'edit'">
              <el-form-item label="按钮名称">
                <el-input v-model="activeButton.name" />
              </el-form-item>
              <el-button class="w-full" @click="updateButton">保存</el-button>
            </el-form>
          </div>
          <div v-else-if="rightFormType == 'text'" class="flex flex-col divide-y divide-gray-300 divide-solid">
            <div class="flex flex-row justify-between">
              <div class="m-2 text-xl">文本</div>
              <div class="flex flex-col justify-center mr-2" v-show="Object.keys(activePanorama).length > 0">
                <el-icon class="border border-gray-300 border-solid p-2 rounded-md" @click="rightFormStatus = 'create'">
                  <Plus />
                </el-icon>
              </div>
            </div>
            <div v-if="rightFormStatus == 'list'" class="m-2 pt-4">
              <div v-for="text in activePanorama.texts" :key="text"
                v-show="activePanorama.texts && activePanorama.texts.length > 0">
                <div class="border border-gray-200 border-solid p-2 shadow rounded flex flex-row justify-between">
                  <div class="flex flex-col justify-center">
                    <div>{{ workOption.text[text].name }}</div>
                  </div>
                  <div>
                    <el-icon class="border border-gray-300 border-solid p-1 rounded-md"
                      @click="activeText = workOption.text[text], rightFormStatus = 'edit'">
                      <Edit />
                    </el-icon>
                  </div>
                </div>
              </div>
              <div v-show="
                !activePanorama.texts && activePanorama.texts.length == 0
              ">
                <el-empty />
              </div>
            </div>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'create'">
              <el-form-item label="文本名称">
                <el-input v-model="formText.name" />
              </el-form-item>
              <el-button class="w-full" @click="storeText">保存</el-button>
            </el-form>
            <el-form class="m-2 pt-4" v-if="rightFormStatus == 'edit'">
              <el-form-item label="文本名称">
                <el-input v-model="activeText.name" />
              </el-form-item>
              <el-button class="w-full" @click="updateText">保存</el-button>
            </el-form>
          </div>
        </div>
      </template>
      <template #content-menu>
        <div class="flex flex-row border-b border-solid border-gray-100 shadow w-full h-12">
          <div class="flex flex-col justify-center">
            <el-button class="mx-1" @click="contentStatus = 'prview'">可视化编辑</el-button>
          </div>
          <div class="flex flex-col justify-center">
            <el-button class="mx-1" @click="contentStatus = 'edit'">文本编辑</el-button>
          </div>
        </div>
      </template>
      <template #content>
        <div class="w-full h-full">
          <div id="prview" class="overflow-hidden" ref="prview" :style="prviewStyle" v-show="contentStatus == 'prview'">
          </div>
          <div id="edit" class="overflow-hidden" ref="edit" :style="prviewStyle" v-show="contentStatus == 'edit'">
            <vue-codemirror v-model="editString" @change="editChange"></vue-codemirror>
          </div>
        </div>
      </template>
      <template #footer>
        <el-tabs type="card" class="px-2" style="height: 90%" addable @tab-add="addSceneGroup"
          @tab-click="setActivePanoramaGroup">
          <el-tab-pane :label="group.name" v-for="(group, uuid) in workOption.panoramaGroup" :key="uuid" :name="uuid">
            <div class="w-full h-full overflow-auto">
              <div v-if="
                workOption.panoramaGroup[uuid].panoramas &&
                workOption.panoramaGroup[uuid].panoramas.length > 0
              " class="flex flex-row">
                <div v-for="panorama in workOption.panoramaGroup[uuid].panoramas" :key="panorama" class="mx-2"
                  @click="setActivePanorama(panoramaInfo[panorama])">
                  <el-image style="width: 100px; height: 50px" :src="getUrl(panoramaInfo[panorama].thumb[0].path)">
                  </el-image>
                </div>
                <div style="width: 47px; height: 47px"
                  class="border border-solid border-gray-100 rounded-md shadow-md flex flex-row justify-center w-full"
                  @click="showSelectPanoramaDialogVisible = true">
                  <div class="flex flex-col justify-center h-full">
                    <el-icon>
                      <Plus />
                    </el-icon>
                  </div>
                </div>
              </div>
              <div v-else>
                <div style="width: 47px; height: 47px"
                  class="border border-solid border-gray-100 rounded-md shadow-md flex flex-row justify-center w-full"
                  @click="showSelectPanoramaDialogVisible = true">
                  <div class="flex flex-col justify-center h-full">
                    <el-icon>
                      <Plus />
                    </el-icon>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </BaseEdit>
    <el-dialog v-model="showSelectPanoramaDialogVisible" title="添加全景素材" width="500px">
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
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showSelectPanoramaDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="storeScene">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showCreatePanoramaGroupDialogVisible" title="新增全景分组" width="350px">
      <div class="flex flex-row justify-between">
        <el-form :model="formPanoramaGroup">
          <el-form-item label="场景分组名称">
            <el-input v-model="formPanoramaGroup.name" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCreatePanoramaGroupDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="storeSceneGroup">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>

</style>
