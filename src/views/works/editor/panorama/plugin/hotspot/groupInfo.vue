<script setup>
import { onActivated, onMounted, watch, ref, computed } from "vue";
const form = ref({})
</script>
<template>
  <el-form>
    <el-form-item label="热点名称">
      <el-input v-model="form.alias" />
    </el-form-item>
    <el-form-item label="热点类型">
      <el-select v-model="form.url">
        <el-option :value="item.url" v-for="item in urlList" :key="item" :label="item.text">
        </el-option>
      </el-select>
    </el-form-item>
    <el-button class="w-full">保存</el-button>
  </el-form>
</template>