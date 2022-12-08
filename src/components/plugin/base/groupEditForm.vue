<script setup>
import { computed, watch, ref, onMounted, defineProps, defineEmits } from "vue";
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
watch(() => group, (group) => {
  if (group) {
    form = group
  }
})
</script>
<template>
  <div>
    <box size="md">
      <el-form-item label="分组名称">
        <el-input v-model="form.name" />
      </el-form-item>
    </box>
  </div>
</template>