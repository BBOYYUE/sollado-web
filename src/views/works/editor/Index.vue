<script setup>
import { Picture, Files } from "@element-plus/icons-vue";
import { computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";


const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
function goTo (url) {
  router.push(url);
}
</script>
<template>
  <router-view class="flex-grow overflow-auto" v-loading="appStore.isLoading" />
</template>