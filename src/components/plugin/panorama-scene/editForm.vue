<script setup>
import { computed, watch, ref, onMounted, defineProps, onActivated } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"

const props = defineProps({
  dataOption: Object
})
const editorStore = useEditorStore();
const emit = defineEmits(['update']);

const info = computed(() => editorStore[props.dataOption.activeDataType])
const groups = computed(() => editorStore[props.dataOption.dataGroupType])


const form = ref({})
// onMounted(() => {
//   console.log(info, form)
// })

watch(() => info.value, (info) => {
  if (info) {
    // 这里需要区分初始值和修改后的值, 所以使用了深拷贝. 
    // 如果是浅拷贝的话 form 修改的时候 info 也会跟着修改
    form.value = { ...info }
  }
}, {
  immediate: true,
}
)
function update () {
  emit('update', form.value, { ...info.value });
}


</script>
<template>
  <div>
    <box size="xs">
      <el-form-item label="场景名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-select v-model="form.group_id">
          <el-option v-for="info in groups" :key="info.hash_id" :label="info.name" :value="info.hash_id">{{
              info.name
          }}</el-option>
        </el-select>
      </el-form-item>
      <span>
        <!-- <el-button type="primary" size="small" @click="$emit('store', getData(formPanoramaList))">确定</el-button> -->
        <el-button type="primary" size="small" @click="update">确定</el-button>
      </span>
    </box>
  </div>
</template>