<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import http from "@/util/http";
import * as api from "@/util/api";
const visible = ref(false);
const props = defineProps({
  visible: Boolean,
});


const loadPanorama = function (node, resolve) {
  if (node.level === 0) {
    http()
      .get(api.host + api.panorama + "?filter[type]=2")
      .then((res) => {
        let respond = res.data;
        if (respond.code == 200) {
          let data = [];
          for (let item in respond.data.data) {
            if (respond.data.data[item].type == 2) {
              data.push({
                name: respond.data.data[item].name,
                hashId: respond.data.data[item].hash_id,
                purpose: respond.data.data[item].purpose,
                type: respond.data.data[item].type,
              });
            }
          }
          return resolve(data);
        }
      });
  } else {
    http()
      .get(
        api.host +
        api.panorama +
        "?filter[parent_id]=" +
        node.data.hashId +
        "&include=xml,thumb"
      )
      .then((res) => {
        let respond = res.data;
        if (respond.code == 200) {
          let data = [];
          let fileList = [];
          for (let item in respond.data.data) {
            if (respond.data.data[item].type == 1) {
              data.push({
                name: respond.data.data[item].name,
                hashId: respond.data.data[item].hash_id,
                purpose: respond.data.data[item].purpose,
                type: respond.data.data[item].type,
              });
            } else if (respond.data.data[item].type == 0) {
              panoramaInfo.value[respond.data.data[item].hash_id] =
                respond.data.data[item];
              fileList.push({
                name: respond.data.data[item].name,
                hashId: respond.data.data[item].hash_id,
                purpose: respond.data.data[item].purpose,
                type: respond.data.data[item].type,
              });
            }
          }
          treePanoramaList.value[node.data.hashId] = fileList;
          return resolve(data);
        }
      });
  }
}
const panoramaTreeProps = ref({
  label: "name",
  children: "childFiles"
})
const activeSelectPanoramaFolder = ref({})
const formPanoramaList = ref([])
const treePanoramaList = ref({})
const panoramaInfo = ref({})
const panoramaTreeClick = function (node) {
  activeSelectPanoramaFolder.value = node;
}
const getData = function (form) {
  let data = []
  form.map((item) => {
    data.push(panoramaInfo.value[item])
  })
  console.log(data);
  return data;
}

</script>
<template>
  <el-dialog v-model="props.visible" title="添加全景素材" width="500px">
    <div class="flex flex-row justify-between" style="height: 300px">
      <el-tree :props="panoramaTreeProps" :load="loadPanorama" lazy ref="treeRef" class="flex flex-grow"
        @node-click="panoramaTreeClick" />
      <div class="shadow-inner p-2 m-2 overflow-y-auto" style="width: 300px">
        <div v-if="
          activeSelectPanoramaFolder.hashId &&
          treePanoramaList[activeSelectPanoramaFolder.hashId] &&
          treePanoramaList[activeSelectPanoramaFolder.hashId].length > 0
        " class="w-full">
          <el-checkbox-group v-model="formPanoramaList" class="flex flex-col">
            <el-checkbox :label="panorama.hashId" size="large" v-for="panorama in treePanoramaList[
              activeSelectPanoramaFolder.hashId
            ]" :key="panorama">
              {{ panorama.name }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <el-empty v-else />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('onClose')">取消</el-button>
        <el-button type="primary" @click="$emit('onSuccess', getData(formPanoramaList))">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>