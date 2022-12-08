<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import * as api from "@/util/api";
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


watch(() => props.info, (info) => {
  if (info && info.xml && info.hash_id) {
    showPanorama(getXmlPath(info))
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