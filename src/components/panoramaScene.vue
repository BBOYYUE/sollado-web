<script setup>
import { computed, watch, ref, onMounted, defineProps, onActivated } from "vue";
import * as api from "@/util/api";
import { useEditorStore } from "@/stores/editor";
import * as krpanoUtil from "@/util/krpanoUtil.js"

const editorStore = useEditorStore();
const props = defineProps({
  info: Object
});

function getUrl (url) {
  let arr = url.split("/");
  return api.assetUrl + arr[4] + "/" + arr[5];
}


const getXmlPath = (info) => {
  return info && info.xml ? getUrl(info.xml[0].path) : ""
}
onMounted(() => {
  if (props.info && props.info.xml && props.info.hash_id) {
    showPanorama(getXmlPath(props.info))
    setTimeout(() => {
      showHotspot(props.info)
    }, 1000)
    setTimeout(() => {
      showView(props.info)
    }, 3000)
  }
})

function showHotspot (info) {
  if (info.hotspots?.length > 0) {
    info.hotspots.map((item) => {
      switch (editorStore.hotspot[item].plugin) {
        case 'panorama-hotspot':
          krpanoUtil.showHotspot(editorStore.hotspot[item], 'hotspot')
          break;
        case 'panorama-flag':
          krpanoUtil.showHotspot(editorStore.hotspot[item], 'flag')
          break;
        case 'panorama-image':
          krpanoUtil.showHotspot(editorStore.hotspot[item], 'image')
          break;
      }
    })
  }
}
function showButton () {

}


function showView (info) {
  if (info.defalutView) {
    krpanoUtil.showView(editorStore.view[info.defalutView])
  }
}

watch(() => props.info, (info) => {
  if (info && info.xml && info.hash_id) {
    showPanorama(getXmlPath(info))
    setTimeout(() => {
      showHotspot(info)
    }, 1000)
    setTimeout(() => {
      showView(info)
    }, 3000)

  }
})
function krpanoReady (krpano) {
  console.log(krpano)
}
function initPanorama () {
  document.getElementById('panorama').innerHTML = "";
  let boxHeight = document.getElementById('panoramaBox').offsetHeight;
  document.getElementById('panorama').style.height = 'calc(' + boxHeight + 'px - 3rem)';
  embedpano({
    swf: "/krpano/tour.swf",
    xml: "/krpano/test.xml",
    target: 'panorama',
    html5: "auto",
    mobilescale: 1.0,
    passQueryParameters: true,
    onready: krpanoReady,
    consolelog: true,
  });
}

function showPanorama (xmlPath) {
  document.getElementById('panorama').innerHTML = "";

  let boxHeight = document.getElementById('panoramaBox').offsetHeight;
  document.getElementById('panorama').style.height = 'calc(' + boxHeight + 'px - 3rem)';
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
</script>
<template>
  <div id="panorama"></div>
</template>