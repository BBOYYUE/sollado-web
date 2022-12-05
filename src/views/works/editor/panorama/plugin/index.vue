<script setup>
import box from "@/components/box.vue"
import hostspotIcon from "@/views/works/editor/panorama/plugin/hotspot/icon.vue"
</script>
<template>
  <div class="w-full h-full flex flex-col">
    <box class="w-full flex-grow">
      <div class="container flex flex-row flex-wrap">
        <box class="w-full md:w-1/2 xl:w-1/3">
          <div class="flex flex-row justify-between">
            <hostspot-icon
              class="w-16 h-16 border border-solid border-gray-100 shadow-inner rounded-md p-6"></hostspot-icon>
            <div class="h-16 flex flex-col justify-center">
              <div class="text-lg font-semibold">热点套件</div>
            </div>
          </div>
        </box>
      </div>
    </box>
  </div>
</template>