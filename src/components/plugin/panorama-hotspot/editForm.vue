<script setup>
import { ref, computed, watch } from "vue"
import box from "@/components/box.vue"
import { useEditorStore } from "@/stores/editor";
import urlList from "./urlList"
// import * as simpleHotspot from "@/common/simpleHotspot.vue"

const emit = defineEmits(['update'])
const props = defineProps({
  dataOption: Object,
  alias: String
})
const editorStore = useEditorStore();
const info = computed(() => editorStore[props.dataOption.activeDataType])
const groups = computed(() => editorStore[props.dataOption.dataGroupType])
const form = ref({})

watch(() => info.value, (info) => {
  if (info) {
    // 这里需要区分初始值和修改后的值, 所以使用了深拷贝. 
    // 如果是浅拷贝的话 form 修改的时候 info 也会跟着修改
    form.value = { ...info }
  }
}, {
  immediate: true,
})


function update () {
  if (form.value.name && form.value.url) {
    emit('update', form.value, { ...info.value });
  }
}

</script>
<template>
  <div>
    <box size="xs">
      <el-form-item :label="props.alias + '名称'">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="props.alias + '样式'">
        <el-select v-model="form.url">
          <el-option v-for="item in urlList" :key="item.url" :label="item.text" :value="item.url" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-select v-model="form.group_id">
          <el-option v-for="info in groups" :key="info.hash_id" :label="info.name" :value="info.hash_id" v-show="info.plugin == 'panorama-hotspot'">{{
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
        <el-button size="small" type="primary" @click="update">确定</el-button>
      </span>
    </box>
  </div>
</template>