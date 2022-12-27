<script setup>
import { computed, watch, ref, onMounted, defineEmits } from "vue";
import http from "@/util/http";
import * as api from "@/util/api";
import box from "@/components/box.vue"

const emit = defineEmits(['store'])
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
const panoramaTreeClick = function (node) {
  activeSelectPanoramaFolder.value = node;
}
const activeSelectPanoramaFolder = ref({})
const formPanoramaList = ref([])
const treePanoramaList = ref({})
const panoramaInfo = ref({})

const getData = function (form) {
  let data = []
  form.map((item) => {
    data.push(panoramaInfo.value[item])
  })
  return data;
}
function store () {
  emit('store', getData(formPanoramaList.value))
}

</script>
<template>
  <div>
    <box size="xs">
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
      <span>
        <el-button type="primary" size="small" @click="store">确定</el-button>
      </span>
    </box>
  </div>

</template>