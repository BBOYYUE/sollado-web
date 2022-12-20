<script setup>
import { ref, computed } from "vue";
import box from "@/components/box.vue"
import urlList from "./urlList"
import { useEditorStore } from "@/stores/editor";

const emit = defineEmits(['store'])
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})
const groups = computed(() => editorStore[props.dataOption.dataGroupType])
const form = ref({})
const editorStore = useEditorStore();
function store() {
  if (form.value.name) {
    emit('store', form.value)
    form.value = {}
  }
}

</script>
<template>
  <div>
    <box size="md">
      <el-form-item :label="props.alias + '名称:'">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="props.alias + '样式:'">
        <el-select v-model="form.url">
          <el-option v-for="item in urlList" :key="item.url" :label="item.text" :value="item.url" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-select v-model="form.group_id">
          <el-option v-for="info in groups" :key="info.hash_id" :label="info.name" :value="info.hash_id">{{
              info.name
          }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="props.alias + '点击跳转到场景:'">
        <el-select v-model="form.linkSceneHashId">
          <el-option v-for="scene in editorStore.scene" :key="scene.hash_id" :label="scene.name"
            :value="scene.hash_id" />
        </el-select>
      </el-form-item>
      <span>
        <el-button size="small" type="primary" @click="store">确定</el-button>
      </span>
    </box>
  </div>
</template>