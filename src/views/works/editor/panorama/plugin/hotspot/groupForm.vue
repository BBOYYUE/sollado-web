<script setup>
import { onActivated, onMounted, watch, ref, computed } from "vue";
const form = ref({})
</script>
<template>
  <el-form>
    <el-form-item label="标牌分组名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-button class="w-full">保存</el-button>
  </el-form>
</template>