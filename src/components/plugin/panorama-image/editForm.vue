<script setup>
import { ref, computed, watch } from "vue"
import box from "@/components/box.vue"
import { v4 as uuid } from "uuid";
import http from "@/util/http";
import * as api from "@/util/api";
import { useEditorStore } from "@/stores/editor";
const emit = defineEmits(['update'])
const props = defineProps({
  alias: String,
  dataOption: Object,
})
const filesystemProps = ref({
  label: "name",
  children: "childFiles",
});
const visible = ref(false)
const panoramaFileList = ref([])
const activeFilesystemFolder = ref({})
const panoramaFileInfo = ref({})

const form = ref({})
const editorStore = useEditorStore();
const info = computed(() => editorStore[props.dataOption.activeDataType])
const groups = computed(() => editorStore[props.dataOption.dataGroupType])

function filesystemTreeClick (node) {
  activeFilesystemFolder.value = node;
}
function update () {
  if (form.value.name && form.value.url) {
    emit('update', form.value, { ...info.value })
  }
}
function loadFilesystem (node, resolve) {
  if (node.level === 0) {
    http()
      .get(api.host + api.filesystem + "?filter[type]=2")
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
      .get(api.host + api.filesystem + "?filter[parent_id]=" + node.data.hashId)
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
            } else if (respond.data.data[item].purpose == 1) {
              panoramaFileInfo.value[respond.data.data[item].hash_id] =
                respond.data.data[item];
              fileList.push({
                name: respond.data.data[item].name,
                hashId: respond.data.data[item].hash_id,
                purpose: respond.data.data[item].purpose,
                type: respond.data.data[item].type,
              });
            }
          }
          panoramaFileList.value[node.data.hashId] = fileList;
          return resolve(data);
        }
      });
  }
}

watch(() => info.value, (info) => {
  if (info) {
    // 这里需要区分初始值和修改后的值, 所以使用了深拷贝. 
    // 如果是浅拷贝的话 form 修改的时候 info 也会跟着修改
    console.log(info)
    form.value = { ...info }
  }
}, {
  immediate: true,
})

</script>
<template>
  <div>
    <box size="xs">
      <el-form-item :label="props.alias + '名称'">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="props.alias + '缩放'">
        <el-input-number v-model="form.scale" :step=".01" :min=".01" max="10" />
      </el-form-item>
      <div class="w-72 my-2" @click="(visible = true)">
        <el-image :src="form.url" @click="showCreateImgHotspotDialogVisible = true" class="w-full"></el-image>
      </div>

      <el-form-item label="所属分组">
        <el-select v-model="form.group_id">
          <el-option v-for="info in groups" :key="info.hash_id" :label="info.name" :value="info.hash_id" v-show="info.plugin == 'panorama-image'">{{
    info.name
}}</el-option>
        </el-select>
      </el-form-item>
      <span>
        <el-button size="small" type="primary" @click="update">确定</el-button>
      </span>
    </box>
    <box size="xs" v-show="visible">
      <div class="flex flex-row justify-between" style="height: 300px">
        <el-tree :props="filesystemProps" :load="loadFilesystem" lazy ref="treeRef" class="flex flex-grow"
          @node-click="filesystemTreeClick" />
        <div class="shadow-inner p-2 m-2 overflow-y-auto" style="width: 300px">
          <div v-if="
  panoramaFileList[activeFilesystemFolder.hashId] &&
  panoramaFileList[activeFilesystemFolder.hashId].length > 0
" class="w-full">
            <el-radio-group v-model="form.url">
              <el-radio v-for="file in panoramaFileList[activeFilesystemFolder.hashId]" :key="file"
                :label="api.getUrl(panoramaFileInfo[file.hashId].path)">{{ file.name }}
              </el-radio>
            </el-radio-group>
          </div>
          <el-empty v-else />
        </div>
      </div>
    </box>
  </div>
</template>