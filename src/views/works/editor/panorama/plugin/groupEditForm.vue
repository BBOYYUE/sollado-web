<script setup>
import { computed, watch, ref, onMounted } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"


const emit = defineEmits(['store'])
const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object,
  field: Object
})
const group = computed(() => editorStore[props.dataOption.activeDataGroupType])

const form = ref({})
watch(() => group.value, (group) => {
  if (group) {
    form.value = group
  }
})
</script>
<template>
  <div>
    <box size="xs">
      <el-form-item label="分组名称">
        <el-input v-model="form.name" />
      </el-form-item>
    </box>
  </div>
</template>