<script setup>
import { Picture, Files } from "@element-plus/icons-vue";
import { computed, watch, ref, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";

const props = defineProps({
  id: String,
});
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
function goTo (url) {
  router.push(url);
}
</script>
<template>
  <div class="flex flex-col w-screen h-screen">
    <div>
      <el-menu default-active="1" mode="horizontal">
        <el-menu-item index="0" disabled>
          <template #title>徵羽宫</template>
        </el-menu-item>
        <el-menu-item index="1" @click="router.push(`/work/editor/panorama/${props.id}/work-info`)">
          <template #title>作品</template>
        </el-menu-item>
        <el-menu-item index="2" @click="router.push(`/work/editor/panorama/${props.id}/scene`)">
          <template #title>场景</template>
        </el-menu-item>
        <el-menu-item index="3" @click="router.push(`/work/editor/panorama/${props.id}/editor`)">
          <template #title>编辑器</template>
        </el-menu-item>
        <el-menu-item index="4" @click="router.push(`/work/editor/panorama/${props.id}/assets`)">
          <template #title>资源列表</template>
        </el-menu-item>
        <el-menu-item index="5" @click="router.push(`/work/editor/panorama/${props.id}/plugin`)">
          <template #title>插件列表</template>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view class="flex-grow overflow-auto" v-loading="appStore.isLoading" />
  </div>
</template>