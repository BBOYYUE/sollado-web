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
onMounted(() => {
    http()
        .get(api.host + api.threeDimensional + props.id)
        .then((res) => {
            threeDimensional.value = res.data.data;
            init();
        });

});
function init() {
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

    function render() {
        requestAnimationFrame(render);
        scene.renderer.render(scene.scene, scene.camera);
        scene.ctrl.update()
    }
    function onResize() {
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
    <div class="w-wull h-full">
        <div id="threeDimensional" style="overflow: hidden" class="w-full h-full"></div>
    </div>
</template>