<script setup>
import { Picture, Files } from "@element-plus/icons-vue";
import { computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
function goTo(url) {
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
                <el-menu-item index="1" @click="router.push('/material-library/manage/storehouse')">
                    <template #title>素材库</template>
                </el-menu-item>
                <el-menu-item index="2" @click="router.push('/work/manage/panorama-work')">
                    <template #title>作品集</template>
                </el-menu-item>
            </el-menu>
        </div>

        <div class="flex flex-row flex-grow">
            <div>
                <el-menu default-active="1" class="h-full">
                    <el-menu-item index="1" @click="goTo('/material-library/manage/storehouse')">
                        <el-icon>
                            <Files />
                        </el-icon>
                        <template #title>文件管理器</template>
                    </el-menu-item>
                    <el-menu-item index="2" @click="goTo('/material-library/manage/panorama-list')">
                        <el-icon>
                            <Picture />
                        </el-icon>
                        <template #title>全景管理器</template>
                    </el-menu-item>
                    <el-menu-item index="3" @click="goTo('/material-library/manage/three-dimensional-list')">
                        <el-icon>
                            <Picture />
                        </el-icon>
                        <template #title>立体模型管理器</template>
                    </el-menu-item>
                </el-menu>
            </div>
            <router-view class="flex-grow overflow-auto" v-loading="appStore.isLoading" />
        </div>
    </div>

</template>