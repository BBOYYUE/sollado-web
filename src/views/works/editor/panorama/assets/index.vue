<script setup>
import { computed, watch, ref } from "vue";
import box from "@/components/box.vue"
const filesystem = ref({
  folder: {
    data: []
  }
});
const getPurposeInfo = function () { }
</script>
<template>
  <box>
    <el-table :data="filesystem.folder.data" stripe style="width: 100%">
      <el-table-column label="名称" width="280">
        <template #default="scope">
          <el-link target="_blank" type="primary" v-on:click.stop="goToActive(scope.row)">{{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="分享码" width="120">
        <template #default="scope">
          <div v-if="scope.row.type == 0">
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
              v-if="scope.row.type == 0">下载</el-button>
            <el-button type="danger" size="small" v-on:click.stop="deleteFile(scope.row.hash_id)"
              v-if="scope.row.purpose != 14">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small :page-count="filesystem.folder.last_page" background layout="prev, pager, next"
      :current-page="filesystem.folder.current_page" @update:current-page="pageClick" class="mt-4" />
  </box>
</template>