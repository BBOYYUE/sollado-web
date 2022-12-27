<script setup>
import { computed, watch, ref, onMounted } from "vue";
import box from "@/components/box.vue"
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
const work = computed(() => editorStore.work, function () {
  return editorStore.work
})

function showPanoramaWork (id) {
  try {
    let features =
      "height=500, width=800, top=100, left=100, toolbar=no, menubar=no, scrollbars = no, resizable = no, location = no, status = no";
    window.open("/work/show/panorama/" + id, "全景作品预览", features);
  } catch (e) {
    console.log(e);
  }
}
function copyPanoramaWorkLink (id) {
  let url =
    window.location.protocol + "//" + window.location.host + "/work/show/panorama/" + id;
  copy(url);
}
function copy (str) {
  let transfer = document.createElement("input");
  document.body.appendChild(transfer);
  transfer.value = str; // 这里表示想要复制的内容
  transfer.focus();
  transfer.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
  }
  transfer.blur();
  console.log("复制成功");
  document.body.removeChild(transfer);
}

</script>
<template>
  <div class="w-full h-full">
    <box class="w-full 2xl:w-1/3  md:w-1/2 ">
      <div class="flex flex-col">
        <div class="flex flex-row justify-between">
          <div class="flex-grow">
            <div class="text-2xl font-bold">{{ work.name }}</div>
            <div class="text-base mt-4">{{ work.info }}</div>
          </div>
          <div>
            <el-image class="w-32 h-32 rounded-md"></el-image>
          </div>
        </div>
        <div class="flex flex-row justify-between mt-6">
          <div class="flex flex-row justify-left">
            <el-link type="primary" @click="showPanoramaWork(work.hash_id)">预览</el-link>
            <el-link type="primary" @click="copyPanoramaWorkLink(work.hash_id)" class="ml-2">复制预览地址</el-link>
          </div>
          <div class="text-xs text-gray-400 ml-4">上一次编辑: 2022年11月30日</div>
        </div>
      </div>
    </box>
  </div>
</template>