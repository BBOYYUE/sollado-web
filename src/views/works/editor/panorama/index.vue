<script setup>
import { computed, watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import { useEditorStore } from "@/stores/editor";
// import closeIcon from "@/components/icon/close.vue"
import powerIcon from "@/components/icon/power.vue"


const props = defineProps({
  workid: String,
});
const editorStore = useEditorStore();
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();


function goTo(url) {
  router.push(url);
}
onMounted(() => {
  console.log(props)
  editorStore.getPanorama(props.workid);
})


</script>
<template>
  <div class="flex flex-col w-screen h-screen">
    <div>
      <el-menu default-active="1" mode="horizontal" :ellipsis="false">
        <el-menu-item index="0" disabled>
          <template #title>徵羽宫</template>
        </el-menu-item>
        <el-menu-item index="1" @click="router.push(`/work/editor/panorama/${props.workid}/work-info`)">
          <template #title>作品</template>
        </el-menu-item>
        <el-menu-item index="3" @click="router.push(`/work/editor/panorama/${props.workid}/editor`)">
          <template #title>编辑器</template>
        </el-menu-item>
        <el-menu-item index="4" @click="router.push(`/work/editor/panorama/${props.workid}/assets`)">
          <template #title>资源列表</template>
        </el-menu-item>
        <el-menu-item index="5" @click="router.push(`/work/editor/panorama/${props.workid}/plugin`)">
          <template #title>插件列表</template>
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="6">
          <template #title>
            <div class="flex flex-col h-16 justify-center">
              <div
                class="rounded-full border border-gray-100 shadow-inner w-12 h-12 flex flex-col justify-center bg-gray-200">
                <div class="flex flex-row m-3 justify-center" @click="router.push('/work/manage/panorama-work')">
                    <power-icon></power-icon>
                </div>
              </div>
            </div>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view class="flex-grow overflow-auto" v-loading="appStore.isLoading" />
  </div>
</template>