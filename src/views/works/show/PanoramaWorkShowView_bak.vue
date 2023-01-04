<script setup>
import http from "@/util/http";
import * as api from "@/util/api";
import { onActivated, onMounted, watch, ref, computed } from "vue";
import * as krpanoUtil from "@/util/krpanoUtil.js"

const work = ref({});
const scene = ref({});
const sceneGroup = ref({})
const hotspot = ref({});
const hotspotGroup = ref({})
const view = ref({})
const viewGroup = ref({})

const hasGroup = ref(false)
const activeSceneGroup = ref({})
const activeScene = ref({})

const krpano = ref({});
const props = defineProps({
  workid: String,
});


watch(() => activeScene.value, (activeScene) => {
  showPanorama(getXmlPath(activeScene))
  if (hasGroup.value) {
    showButtonGroup(sceneGroup.value)
    let data = {}
    for (let index in activeSceneGroup.value.scenes) {
      let hashId = activeSceneGroup.value.scenes[index]
      data[hashId] = scene.value[hashId]
    }
    showButton(data)
  }
  setTimeout(() => {
    showHotspot(activeScene)
  }, 1000)
  setTimeout(() => {
    showView(activeScene)
  }, 1000)
})
const getXmlPath = (info) => {
  return info && info.xml ? api.getUrl(info.xml[0].path) : ""
}
const getThumbPath = (info) => {
  return info && info.tile ? api.getUrl(info.tile[0].path) : api.getUrl(info.thumb[0].path)
}

function showPanorama (xmlPath) {
  document.getElementById('panorama').innerHTML = "";
  embedpano({
    swf: "/krpano/tour.swf",
    xml: "/krpano/tour.xml",
    target: 'panorama',
    html5: "auto",
    mobilescale: 1.0,
    passQueryParameters: true,
    initvars: { xmlPath: xmlPath },
    onready: krpanoReady,
    consolelog: true,
  });
}
function showHotspot (info) {
  if (info.hotspots?.length > 0) {
    info.hotspots.map((item) => {
      switch (hotspot.value[item].plugin) {
        case 'panorama-hotspot':
          krpanoUtil.showHotspot(hotspot.value[item], 'hotspot')
          break;
        case 'panorama-flag':
          krpanoUtil.showHotspot(hotspot.value[item], 'flag')
          break;
        case 'panorama-image':
          krpanoUtil.showHotspot(hotspot.value[item], 'image')
          break;
      }
    })
  }
}
function showView (info) {
  if (info.defalutView) {
    krpanoUtil.showView(view.value[info.defalutView])
  }
}
function showButton (info) {
  let i = 0
  for (let index in info) {
    let data = {
      hash_id: info[index].hash_id,
      name: info[index].name,
      thumburl: getThumbPath(info[index]),
      x: 10 + i * 70,
      y: hasGroup.value ? 160 : 85,
      active: info[index].hash_id == activeScene.value.hash_id
    }
    i++;
    krpanoUtil.showPhotoButton(data)
  }
}

function showButtonGroup (info) {
  let i = 0
  for (let index in info) {
    let data = {
      hash_id: info[index].hash_id,
      name: info[index].name,
      thumburl: getThumbPath(scene.value[info[index].scenes[0]]),
      x: 10 + i * 70,
      y: 85,
      active: info[index].hash_id == activeSceneGroup.value.hash_id
    }
    i++;
    krpanoUtil.showPhotoGroupButton(data)
  }
}

onMounted(() => {
  http()
    .get(api.host + api.panoramaWork + 'getDocument/' + props.workid)
    .then((res) => {
      let respond = res.data;
      if (respond.code == 200) {
        work.value = respond.data;
        if (respond.data.option) {
          let option = JSON.parse(respond.data.option)

          scene.value = option.scene
          sceneGroup.value = option.sceneGroup
          hotspot.value = option.hotspot
          hotspotGroup.value = option.hotspotGroup
          view.value = option.view
          viewGroup.value = option.viewGroup
        }
        init();
      }

    });

  window.addEventListener('sceneGroupOnclick', sceneGroupOnclick)
  window.addEventListener('sceneOnclick', sceneOnclick)
  window.addEventListener('hotspotOnclick', hotspotOnclick)

});
function sceneGroupOnclick (event) {
  let hash_id = event.sceneGroup.split('_')[1];
  for (let index in sceneGroup.value) {
    if (index.toLowerCase() == hash_id) {
      activeSceneGroup.value = sceneGroup.value[index]
    }
  }
  activeScene.value = scene.value[activeSceneGroup.value.scenes[0]]
}
function sceneOnclick (event) {
  let hash_id = event.scene.split('_')[1];
  for (let index in scene.value) {
    if (index.toLowerCase() == hash_id) {
      activeScene.value = scene.value[index]
    }
  }
}
function hotspotOnclick (event) {
  console.log(event.hotspot)
}

function krpanoReady (krpano) {
}
function init () {
  let sceneGroupHashIdList = Object.keys(sceneGroup.value);
  let sceneHashIdList = Object.keys(scene.value)
  if (sceneGroupHashIdList.length > 0) {
    hasGroup.value = true
    activeSceneGroup.value = sceneGroup.value[sceneGroupHashIdList[0]];
    activeScene.value = scene.value[activeSceneGroup.value.scenes[0]]
  } else {
    hasGroup.value = false
    activeScene.value = scene.value[sceneHashIdList[0]]
  }
}

</script>
<template>
  <div id="panorama" class="w-screen h-screen"></div>
</template>