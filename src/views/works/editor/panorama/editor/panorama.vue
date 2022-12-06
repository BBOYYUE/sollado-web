<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";

const props = defineProps({
  xmlPath: String,
  panoId: String
});

onMounted(() => {
  if (props.panoId) {
    if (props.xmlPath) {
      showPanorama(props.panoId, props.xmlPath)
    } else {
      initPanorama(props.panoId)
    }
  }
});
watch(() => props.panoId, function (panoId) {
  if (panoId) {
    if (props.xmlPath) {
      showPanorama(panoId, props.xmlPath)
    } else {
      initPanorama(panoId)
    }
  }
})
function krpanoReady (krpano) {
  console.log(krpano)
}
function initPanorama (panoId) {
  document.getElementById(panoId).innerHTML = "";
  let boxHeight = document.getElementById('panoramaBox').offsetHeight;
  document.getElementById(panoId).style.height = 'calc(' + boxHeight + 'px - 5rem)';
  embedpano({
    swf: "/krpano/tour.swf",
    xml: "/krpano/test.xml",
    target: panoId,
    html5: "auto",
    mobilescale: 1.0,
    passQueryParameters: true,
    onready: krpanoReady,
    consolelog: true,
  });
}

function showPanorama (panoId, xmlPath) {
  document.getElementById(panoId).innerHTML = "";
  let boxHeight = document.getElementById('panoramaBox').offsetHeight;
  document.getElementById(panoId).style.height = 'calc(' + boxHeight + 'px - 5rem)';
  embedpano({
    swf: "/krpano/tour.swf",
    xml: "/krpano/tour.xml",
    target: panoId,
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
  <div :id="props.panoId"></div>
</template>