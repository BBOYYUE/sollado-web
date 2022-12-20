<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"
import * as api from "@/util/api";

const emit = defineEmits(['update', 'edit', 'del'])
const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object
})
const info = computed(() => editorStore[props.dataOption.activeDataType])

const panoramaName = computed(() => {
  if (info.value && info.value.name) {
    return info.value.name;
  } else {
    return ""
  }
});
const thumbPath = computed(() => {
  if (info.value && info.value.thumb && info.value.thumb[0]) {
    return getUrl(info.value.thumb[0].path)
  } else {
    return ""
  }
});
function viewChange(v) {
  emit('update', form.value, { ...info.value });
}
const form = ref({})
// onMounted(() => {
//   console.log(info, form)
// })

watch(() => info.value, (info) => {
  if (info) {
    // 这里需要区分初始值和修改后的值, 所以使用了深拷贝. 
    // 如果是浅拷贝的话 form 修改的时候 info 也会跟着修改
    form.value = { ...info }
  }
}, {
  immediate: true,
}
)


function getUrl(url) {
  let arr = url.split("/");
  return api.assetUrl + arr[4] + "/" + arr[5];
}
watch(() => panoramaName, function (panoramaName) {
  console.log(panoramaName)
},
  {
    immediate: true,
  })
</script>
<template>
  <div class="flex flex-col">
    <box size="md">
      <div class="flex flex-col ">
        <div class="flex flex-row justify-between ">
          <div class="flex-grow">
            <div class="text-xl font-bold w-48">{{ panoramaName }}</div>
          </div>
          <div>
            <el-image class="w-64 h-32 rounded-md" :src="thumbPath"></el-image>
          </div>
        </div>
        <div class="flex flex-row justify-between mt-6">
          <div class="flex flex-row">
            <el-link type="primary" @click="$emit('edit', info)" class="mx-1">编辑</el-link>
            <el-link type="danger" @click="$emit('del', info.hash_id)" class="mx-1">移除</el-link>
          </div>
          <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
        </div>
      </div>
      <!-- <scene-card :info="info"></scene-card> -->
    </box>
    <box size="md">
      当前场景默认视角:
      <el-select v-model="info.defalutView" @change="viewChange">
        <el-option v-for="view in info.views" :key="view" :label="editorStore.view[view].name" :value="view" />
      </el-select>
    </box>
  </div>
</template>