<script setup>
import { Picture, Files } from "@element-plus/icons-vue";
import { computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import { useEditorStore } from "@/stores/editor";
import PowerIcon from "@/components/icon/power.vue"

const appStore = useAppStore();
const editorStore = useEditorStore();
const route = useRoute();
const router = useRouter();
const work = computed(() => editorStore.work, function () {
  return editorStore.work
})
function goTo(url) {
  router.push(url);
}
// 
</script>
<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="flex flex-row w-full h-12 justify-end bg-gray-50 shadow-md mb-2">
      <div class="flex flex-col w-10 h-full justify-center mr-3 ">
        <div class="flex flex-row w-8 h-8  justify-center rounded-full border border-gray-100 shadow-inner bg-gray-200 "
         @click="router.push(`/work/manage/panorama-work/${work.hash_id}`)">
          <div class="flex flex-col justify-center ">
            <div class="w-6 h-6">
              <power-icon></power-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view class="flex-grow overflow-auto" v-loading="appStore.isLoading" />
  </div>
</template>