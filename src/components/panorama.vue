<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";

const props = defineProps({
  xmlPath: String,
  panoId: String
});

watch(() => props.panoId, function (panoId) {
  console.log(panoId)
}, {
  immediate: true,
})
function initPanorama () {
  document.getElementById("panorama").innerHTML = "";
  embedpano({
    swf: "/krpano/tour.swf",
    xml: "/krpano/test.xml",
    target: "panorama",
    html5: "auto",
    mobilescale: 1.0,
    passQueryParameters: true,
    onready: krpanoReady,
    consolelog: true,
  });
}
</script>
<template>
  <div :id="props.panoId"></div>
</template>