<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import { useEditorStore } from "@/stores/editor";



const props = defineProps({
  workid: String,
});
const editorStore = useEditorStore();
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();


function goTo (url) {
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
      <el-menu default-active="1" mode="horizontal">
        <el-menu-item index="0" disabled>
          <template #title>徵羽宫</template>
        </el-menu-item>
        <el-menu-item index="1" @click="router.push(`/work/editor/panorama/${props.workid}/work-info`)">
          <template #title>作品</template>
        </el-menu-item>
        <!-- <el-menu-item index="2" @click="router.push(`/work/editor/panorama/${props.workid}/scene`)">
          <template #title>场景</template>
        </el-menu-item> -->
        <el-menu-item index="3" @click="router.push(`/work/editor/panorama/${props.workid}/editor`)">
          <template #title>编辑器</template>
        </el-menu-item>
        <el-menu-item index="4" @click="router.push(`/work/editor/panorama/${props.workid}/assets`)">
          <template #title>资源列表</template>
        </el-menu-item>
        <el-menu-item index="5" @click="router.push(`/work/editor/panorama/${props.workid}/plugin`)">
          <template #title>插件列表</template>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view class="flex-grow overflow-auto" v-loading="appStore.isLoading" />
  </div>
</template>