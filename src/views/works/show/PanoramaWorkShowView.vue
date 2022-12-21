<script setup>
import http from "@/util/http";
import * as api from "@/util/api";
import { onActivated, onMounted, watch, ref, defineProps } from "vue";
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

watch(() => activeScene.value, (scene) => {
  showPanorama(getXmlPath(scene))
  showButton(scene)
  setTimeout(() => {
    showHotspot(scene)
  }, 1000)
  setTimeout(() => {
    showView(scene)
  }, 3000)
})
const getXmlPath = (info) => {
  return info && info.xml ? getUrl(info.xml[0].path) : ""
}
const getThumbPath = (info) => {
  return info && info.tile ? getUrl(info.tile[0].path) : ""
}

function getUrl (url) {
  let arr = url.split("/");
  return api.assetUrl + arr[4] + "/" + arr[5];
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
  if (hasGroup.value) {
    krpanoUtil.showPhotoButton({
      hash_id: info.hash_id,
      name: info.name,
      thumburl: getThumbPath(info),
      x: 10,
      y: 10
    })
  }
}

onMounted(() => {
  http()
    .get(api.host + api.panoramaWork + props.workid)
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
});
function krpanoReady (krpano) {
  console.log(krpano)
}
function init () {
  console.log(sceneGroup.value, scene.value)
  let sceneGroupHashIdList = Object.keys(sceneGroup.value);
  let sceneHashIdList = Object.keys(scene.value)
  if (sceneGroupHashIdList.length > 0) {
    hasGroup.value = true
    activeSceneGroup.value = sceneGroup.value[sceneGroupHashIdList[0]];
    activeScene.value = scene.value[activeSceneGroup.scenes[0]]
  } else {
    activeScene.value = scene.value[sceneHashIdList[1]]
  }
}

</script>
<template>
  <div id="panorama" class="w-screen h-screen"></div>
</template>