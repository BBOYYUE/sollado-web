<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { onActivated, onMounted, watch, ref } from "vue";
import { usePanoramaWorkStore } from "@/stores/panoramaWork";
import { Timer, ArrowRight } from "@element-plus/icons-vue";
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const panoramaWork = usePanoramaWorkStore();
const dialogAssetVisible = ref(false);
const props = defineProps({
  id: String,
});
let searchForm = ref({
  name: "",
});
const form = ref({
  name: "",
});
function goBack () {
  let len = panoramaWork.history.length;
  if (len > 1) {
    router.push("/work/manage/panorama-work/" + panoramaWork.history[len - 2].hashId);
    panoramaWork.history.pop();
  }
}

function search (name) {
  panoramaWork.setFilterByName(name);
  panoramaWork.getAsset();
}
function pageClick (page) {
  panoramaWork.setPage(page);
  panoramaWork.getAsset();
}

function storeAsset () {
  let formData = Object.assign(
    {},
    {
      user_id: authStore.user.id,
    },
    form.value
  );
  dialogAssetVisible.value = false;
  panoramaWork.storeAsset(formData);
}

function deletePanoramaWork (id) {
  panoramaWork.deletePanoramaWork(id);
}
function editPanoramaWork (id) {
  try {
    router.push(`/work/manage/panorama-work/${id}`);
  } catch (e) {
    console.log(e);
  }
}
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

onActivated(() => {
  panoramaWork.getAsset();
});
onMounted(() => {
  panoramaWork.getAsset();
});

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
</script>

<template>
  <div class="w-wull h-full flex flex-col">
    <el-card class="m-4">
      <template #header>
        <div class="flex flex-row justify-between">
          <span class="text-2xl align-middle">全景作品</span>
        </div>
      </template>
      <el-page-header @back="goBack">
        <template #breadcrumb>
          <el-breadcrumb :separator-icon="ArrowRight">
            <!-- <el-breadcrumb-item v-for="item in panoramaWork.history" :key="item" @click="goToActive(item)">
              <div>{{ item.name }}</div>
            </el-breadcrumb-item> -->
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
            <el-button type="primary" class="ml-2" @click="dialogAssetVisible = true">创建全景作品</el-button>
          </div>
        </template>
      </el-page-header>
    </el-card>
    <el-card class="mx-4">
      <el-table :data="panoramaWork.assets.data" stripe style="width: 100%">
        <el-table-column label="名称">
          <template #default="scope">
            <el-link target="_blank" type="primary"  v-on:click.stop="editPanoramaWork(scope.row.hash_id)">
              {{ scope.row.name }}
            </el-link>
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
        <el-table-column label="分享码" width="120">
          <template #default="scope">
            <div>
              {{ scope.row.hash_id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350" fixed="right">
          <template #default="scope">
            <div class="flex flex-row flex-nowrap justify-end w-full">
              <el-button-group class="mr-4">
                <el-button type="success" size="small" v-on:click.stop="showPanoramaWork(scope.row.hash_id)">
                  预览
                </el-button>
                <el-button type="success" size="small" v-on:click.stop="copyPanoramaWorkLink(scope.row.hash_id)">
                  复制预览链接
                </el-button>
              </el-button-group>
              <el-button type="primary" size="small" v-on:click.stop="editPanoramaWork(scope.row.hash_id)">
                编辑
              </el-button>
              <el-button type="danger" size="small" v-on:click.stop="deletePanoramaWork(scope.row.hash_id)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="dialogAssetVisible" title="创建全景作品" width="300px">
        <el-form :model="form">
          <el-form-item label="全景作品名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="storeAsset">确定</el-button>
          </span>
        </template>
      </el-dialog>

      <el-pagination small :page-count="panoramaWork.assets.last_page" background layout="prev, pager, next"
        :current-page="panoramaWork.assets.current_page" @update:current-page="pageClick" class="mt-4" />
    </el-card>
  </div>
</template>
