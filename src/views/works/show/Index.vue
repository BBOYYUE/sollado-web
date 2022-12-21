<script setup>
import { Picture, Files } from "@element-plus/icons-vue";
import { computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
function goTo (url) {
  router.push(url);
}
watch(
  () => authStore.isAuth,
  (isAuth) => {
    if (route.meta.isAuth == false) {
      return;
    } else if (!isAuth) {
      router.push("/login");
    }
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="w-screen h-screen">
    <router-view class="flex-grow overflow-auto" v-loading="appStore.isLoading" />
  </div>

</template>