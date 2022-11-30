<script setup>
import box from "@/components/box.vue"


</script>
<template>
    <div class="w-full h-full">
        <box class="w-full">
            <el-tabs>
                <el-tab-pane label="所有场景">
                    <div class="m-4">
                        <div class="text-2xl font-bold">所有场景</div>
                        <div class="container flex flex-row flex-wrap">
                            <box class="w-full md:w-1/2 xl:w-1/3">
                                <div class="flex flex-row justify-between">
                                    <el-image class="w-64 h-32"></el-image>
                                    <div class="h-32 flex flex-col justify-center">
                                        <div class="text-lg font-semibold">场景1</div>
                                    </div>
                                </div>
                            </box>
                            <box class="w-full md:w-1/2 xl:w-1/3">
                                <div class="flex flex-row justify-between">
                                    <el-image class="w-64 h-32"></el-image>
                                    <div class="h-32 flex flex-col justify-center">
                                        <div class="text-lg font-semibold">场景1</div>
                                    </div>
                                </div>
                            </box>
                            <box class="w-full md:w-1/2 xl:w-1/3">
                                <div class="flex flex-row justify-between">
                                    <el-image class="w-64 h-32"></el-image>
                                    <div class="h-32 flex flex-col justify-center">
                                        <div class="text-lg font-semibold">场景1</div>
                                    </div>
                                </div>
                            </box>
                            <box class="w-full md:w-1/2 xl:w-1/3">
                                <div class="flex flex-row justify-between">
                                    <el-image class="w-64 h-32"></el-image>
                                    <div class="h-32 flex flex-col justify-center">
                                        <div class="text-lg font-semibold">场景1</div>
                                    </div>
                                </div>
                            </box>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="场景分组">
                    <el-tabs tab-position="left" class="my-8">
                        <el-tab-pane label="分组A">
                            <div class="container flex flex-row flex-wrap">
                                <box class="w-full md:w-1/2 xl:w-1/3">
                                    <div class="flex flex-row justify-between">
                                        <el-image class="w-64 h-32"></el-image>
                                        <div class="h-32 flex flex-col justify-center">
                                            <div class="text-lg font-semibold">场景1</div>
                                        </div>
                                    </div>
                                </box>
                                <box class="w-full md:w-1/2 xl:w-1/3">
                                    <div class="flex flex-row justify-between">
                                        <el-image class="w-64 h-32"></el-image>
                                        <div class="h-32 flex flex-col justify-center">
                                            <div class="text-lg font-semibold">场景1</div>
                                        </div>
                                    </div>
                                </box>
                                <box class="w-56">
                                    <el-icon class="w-32 h-32">
                                        <Plus />
                                    </el-icon>
                                </box>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <el-button type="primary" class="mt-6">添加分组</el-button>
                </el-tab-pane>
            </el-tabs>
        </box>
    </div>
</template>