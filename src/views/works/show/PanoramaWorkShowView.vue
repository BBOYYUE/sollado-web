<script setup>
import http from "@/util/http";
import * as api from "@/util/api";
import { onActivated, onMounted, watch, ref, computed } from "vue";
import * as krpanoUtil from "@/util/krpanoUtil.js"
const props = defineProps({
  workid: String,
});
onMounted(() => {
  showPanorama(api.host + api.panoramaWork + 'getDocument/' + props.workid);
  // http()
  //   .get(api.host + api.panoramaWork + 'getDocument/' + props.workid)
  //   .then((res) => {
  //     let respond = res.data;
  //     console.log(respond)
  //   });
});
function krpanoReady (krpano) {
  console.log(krpano)
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
</script>
<template>
  <div id="panorama" class="w-screen h-screen"></div>
</template>
