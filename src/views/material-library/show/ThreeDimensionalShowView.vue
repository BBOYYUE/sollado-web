<script setup>
import http from "@/util/http";
import * as api from "@/util/api";
import { onActivated, onMounted, watch, ref } from "vue";
import SceneUtil from "@/util/scene"

let scene = ref({})
const threeDimensional = ref({});
const krpano = ref({});
const props = defineProps({
  id: String,
});
const containerStyle = ref(
  {
    width: 'calc(100vw)',
    height: 'calc(100vh)'
  }
)


onMounted(() => {
  document.title = "3D模型展示"
  if (props.id) {
    http()
      .get(api.host + api.threeDimensional + props.id)
      .then((res) => {
        threeDimensional.value = res.data.data;
        init();
      });
  } else {
    testInit();
  }

});
function init () {
  window.addEventListener('contentResize', onResize, false);
  let el = document.getElementById("threeDimensional")
  scene = new SceneUtil(el);
  scene.__init()
  scene.__setAssetUrl(api.assetUrl)
  if (threeDimensional.value.map && threeDimensional.value.map.length > 0) {
    scene.__loadMap(threeDimensional.value.map)
  }
  if (threeDimensional.value.obj && threeDimensional.value.obj.length > 0) {
    scene.__loadObj(threeDimensional.value.obj)
  }
  scene.createAmbientLight({
    intensity: 1.0,
    position: [800, 800, 800]
  })

  function render () {
    requestAnimationFrame(render);
    scene.renderer.render(scene.scene, scene.camera);
    scene.ctrl.update()
  }
  function onResize () {
    scene.renderer.setSize(el.offsetWidth, el.offsetHeight);
    scene.renderer.render(scene.scene, scene.camera)
  }
  render();
}

watch(
  () => threeDimensional,
  (threeDimensional) => {
    if (threeDimensional) {
      init();
    }
  }
);
</script>
<template>
  <div class="w-wull h-full flex flex-col justify-center">
    <div class="text-black absolute top-0 left-0"> 正在加载中:
      <span id="status"></span>
      <span id="progress"></span>
      <span id="tiems"></span>
    </div>
    <div id="threeDimensional" style="overflow: hidden" :style="containerStyle"></div>
  </div>
</template>