<script setup>
import { ref, defineEmits, computed, defineProps, watch } from "vue"
import box from "@/components/box.vue"
import { useEditorStore } from "@/stores/editor";

const props = defineProps({
  dataOption: Object
})
const editorStore = useEditorStore();
const form = ref({})

const emit = defineEmits(['update'])
const info = computed(() => editorStore[props.dataOption.activeDataType])
const groups = computed(() => editorStore[props.dataOption.dataGroupType])
function update () {
  if (form.value.name) {
    emit('update', form.value, { ...info.value });
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
}
)
function getView () {
  let krpano = document.getElementById('krpanoSWFObject')
  form.value.hlookat = krpano.get("view.hlookat");
  form.value.vlookat = krpano.get("view.vlookat");
  form.value.fov = krpano.get("view.fov");
  form.value.fovmax = form.value.fov + 20
  form.value.fovmin = form.value.fov - 20
  form.value.maxpixelzoom = ''
}
function setView () {
  let krpano = document.getElementById('krpanoSWFObject')
  krpano.set("view.hlookat", form.value.hlookat);
  krpano.set("view.vlookat", form.value.vlookat);
  krpano.set("view.fov", form.value.fov);
  krpano.set("view.fovmax", form.value.fovmax);
  krpano.set("view.fovmin", form.value.fovmin);
  krpano.set("view.fovmin", form.value.fovmin);
  krpano.set("view.maxpixelzoom", form.value.maxpixelzoom);
}
</script>
<template>
  <div>
    <box size="md">
      <el-form-item label="视角名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="水平方向坐标:">
        <el-input v-model="form.vlookat"></el-input>
      </el-form-item>
      <el-form-item label="垂直方向坐标:">
        <el-input v-model="form.hlookat"></el-input>
      </el-form-item>
      <el-form-item label="视场:">
        <el-input v-model="form.fov"></el-input>
      </el-form-item>
      <el-form-item label="最小视场:">
        <el-input v-model="form.fovmin"></el-input>
      </el-form-item>
      <el-form-item label="最大视场:">
        <el-input v-model="form.fovmax"></el-input>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-select v-model="form.group_id">
          <el-option v-for="info in groups" :key="info.hash_id" :label="info.name" :value="info.hash_id">{{
              info.name
          }}</el-option>
        </el-select>
      </el-form-item>
      <span>
        <el-button type="primary" size="small" @click="update">确定</el-button>
        <el-button type="primary" size="small" @click="getView">获取场景当前视角</el-button>
        <el-button type="primary" size="small" @click="setView">展示视角</el-button>
      </span>
    </box>
  </div>
</template>