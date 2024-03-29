<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useFilesystemStore } from "@/stores/filesystem";
import { ElMessage } from "element-plus";
import * as api from "@/util/api";
import * as purpose from "@/common/filePurpose";

import { Timer, UploadFilled, ArrowRight } from "@element-plus/icons-vue";
import axios from "axios";
import * as filesystemType from "@/common/filesystemType.js"

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const filesystem = useFilesystemStore();
const props = defineProps({
  id: String,
});
let dialogVisible = ref(false);
let dialogFileVisible = ref(false);
let searchForm = ref({
  name: "",
});
const form = ref({
  name: "",
});
const tabeleMaxHeight = window.innerHeight - 350
const uploadData = ref({})
const uploadUrl = ref("")
const errorMsg = (msg) => {
  ElMessage({
    message: msg,
    type: "error",
  });
};
const successMsg = (msg) => {
  ElMessage({
    message: msg,
    type: "success",
  });
};

function onFileUploadSuccess(respond) {
  console.log(respond)
  if (respond.code == 200) {
    successMsg("上传成功!");
    filesystem.addFile(respond.data);
  } else {
    errorMsg("上传失败!");
  }
}
function getPurposeInfo(val) {
  return purpose.getPurpose(val)
}

function downloadFile(id) {
  filesystem.downloadFile(id);
}

function deleteFile(id) {
  filesystem.deleteFile(id);
}
function goToActive(row) {
  if (row.type == filesystemType.FOLDER) {
    let hashId = row.hash_id ?? row.hashId;
    router.push("/material-library/manage/folder/" + hashId + "?name=" + row.name);
  } else if (row.type == filesystemType.ASSET) {
    window.open(row.path, "_blank ");
  }
}

function storeFolder() {
  let formData = Object.assign(
    {},
    {
      user_id: authStore.user.id,
      parent_id: filesystem.active.hashId,
      type: filesystemType.FOLDER,
    },
    form.value
  );
  dialogVisible.value = false;
  filesystem.storeFolder(formData);
}

function goBack() {
  let len = filesystem.history.length;
  if (len > 1) {
    router.push(
      "/material-library/manage/folder/" +
      filesystem.history[len - 2].hashId +
      "?name=" +
      filesystem.history[len - 2].name
    );
  } else {
    router.push("/material-library/manage/storehouse");
  }
  filesystem.history.pop();
}
function search(name) {
  filesystem.setFilterByName(name);
  filesystem.getFolder();
}
function pageClick(page) {
  filesystem.setPage(page);
  filesystem.getFolder();
}
async function handleBeforeUpload(file) {
  try {
    const res = await axios.create({
      baseURL: api.host,
      headers: {
          Authorization: authStore.tokenType + ' ' + authStore.accessToken,
      }
    }).post(
      api.ossSignatureVerification, 
      {
        name: file.name,
        parent_id: props.id,
        type: filesystemType.ASSET,
      },
    )
    const response = res.data
    uploadUrl.value = response.host

    // 组装自定义参数「如果要自定义回传参数这段代码不能省略」
    if (response['callback-var'] && Object.keys(response['callback-var']).length) {
      for (const [key, value] of Object.entries(response['callback-var'])) {
        uploadData.value[key] = value
      }
    }
    uploadData.value.policy = response.policy
    uploadData.value.OSSAccessKeyId = response.accessid
    uploadData.value.signature = response.signature
    uploadData.value.host = response.host
    uploadData.value.callback = response.callback
    uploadData.value.key = response.dir + '/' + file.name
  } catch (error) {
    errorMsg('获取上传配置失败')
  }
}
watch(
  () => authStore.isAuth,
  (isAuth) => {
    if (!isAuth) {
      router.push("/login");
    }
  },
  {
    immediate: true,
  }
);
watch(
  () => props.id,
  (id) => {
    if (id) {
      filesystem.setActive({
        hashId: id,
        name: route.query ? route.query.name : "",
      });
      filesystem.getFolder();
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="w-wull h-full flex flex-col">
    <el-card class="m-4">
      <template #header>
        <div><span class="text-2xl align-middle">文件管理器</span></div>
      </template>
      <el-page-header @back="goBack">
        <template #breadcrumb>
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="item in filesystem.history" :key="item" @click="goToActive(item)">
              <div>{{ item.name }}</div>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <template #content>
          <div class="flex items-center">
            <span class="text-large font-600">
              {{ authStore.user.name }}
            </span>
          </div>
        </template>
        <template #extra>
          <div class="flex items-center">
            <el-input v-model="searchForm.name" placeholder="按名称搜索" @input="search" />
            <el-button type="primary" class="ml-2" @click="dialogVisible = true">创建文件夹</el-button>
            <el-button type="primary" class="ml-2" @click="dialogFileVisible = true">上传文件</el-button>
          </div>
        </template>
      </el-page-header>
    </el-card>
    <el-card class="mx-4">
      <el-table :data="filesystem.folder.data" stripe style="width: 100%" :max-height="tabeleMaxHeight">
        <el-table-column label="名称" width="280">
          <template #default="scope">
            <el-link target="_blank" type="primary" v-on:click.stop="goToActive(scope.row)">{{ scope.row.name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="分享码" width="120">
          <template #default="scope">
            <div v-if="scope.row.type == filesystemType.ASSET">
              {{ scope.row.hash_id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" width="200">
          <template #default="scope">
            <div>
              <el-icon>
                <timer />
              </el-icon>
              {{ new Date(scope.row.created_at).format("yyyy-MM-dd hh:mm:ss") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用途">
          <template #default="scope">
            {{ getPurposeInfo(scope.row.purpose) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <div class="flex flex-row flex-nowrap justify-end w-full">
              <el-button type="primary" size="small" v-on:click.stop="downloadFile(scope.row.hash_id)"
                v-if="scope.row.type == filesystemType.ASSET">下载</el-button>
              <el-button type="danger" size="small" v-on:click.stop="deleteFile(scope.row.hash_id)"
                v-if="scope.row.purpose != 14">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small :page-count="filesystem.folder.last_page" background layout="prev, pager, next"
        :current-page="filesystem.folder.current_page" @update:current-page="pageClick" class="mt-4" />
    </el-card>
    <el-dialog v-model="dialogVisible" title="创建文件夹" width="300px">
      <el-form :model="form">
        <el-form-item label="文件夹名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="storeFolder">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFileVisible" title="上传文件" width="500px">
      <div class="w-full h-full overflow-auto" style="height: 300px">
        <el-upload drag  multiple
        :action="uploadUrl" 
        :data="uploadData" 
        :on-success="onFileUploadSuccess" 
        :before-upload="handleBeforeUpload" class="mx-4">
          <el-icon class="el-icon--upload" style="height: 150px">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            将文件拖动到这里或者<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">文件不能超过100MB</div>
          </template>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>
