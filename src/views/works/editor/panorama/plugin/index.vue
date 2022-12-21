<script setup>
import box from "@/components/box.vue"
import hostspotIcon from "@/components/icon/panorama-hotspot.vue"
import logicIcon from "@/components/icon/panorama-logic.vue"
import sceneIcon from "@/components/icon/panorama-scene.vue"
import pluginCommon from "@/common/plugin.js"
import pluginBase from "@/components/plugin/base/index.js"

const pluginList = () => {
  let list = []
  let pluginBaseImpl = new pluginBase()
  for (let index in pluginCommon) {
    list.push(pluginBaseImpl.builder(pluginCommon[index]));
  }
  return list
}

</script>
<template>
  <div class="w-full h-full flex flex-col">
    <box class="w-full flex-grow">
      <div class="container flex flex-row flex-wrap">
        <box class="w-full md:w-1/2 xl:w-1/3" v-for="plugin in pluginList()" :key="plugin">
          <div class="flex flex-row justify-between">
            <component :is="plugin.component.icon"
              class="w-16 h-16 border border-solid border-gray-100 shadow-inner rounded-md p-6"></component>
            <div class="h-16 flex flex-col justify-center">
              <div class="text-lg font-semibold">{{ plugin.alias }}</div>
            </div>
          </div>
        </box>
      </div>
    </box>
  </div>
</template>