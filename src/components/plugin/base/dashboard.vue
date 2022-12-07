<script setup>
import { computed, watch, ref, onMounted, defineProps } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"

const emit = defineEmits(['itemClick', 'groupClick'])
const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object
})

const groupAlias = computed(() => {
  return props.alias + "分组"
})

const groupData = computed(() => editorStore[props.dataOption.dataGroupType])
const itemData = computed(() => editorStore[props.dataOption.dataType])

const groupTabClick = function (pane) {
  emit('groupClick', groupData.value[pane.props.name])
}
const itemClick = function (item) {
  emit('itemClick', item)
}

</script>
<template>
  <div class="w-144">
    <box>
      <el-tabs>
        <el-tab-pane :label="props.alias">
          <div class="flex flex-row flex-wrap">
            <box size="sm" marign="none" v-for="(info, hash_id) in itemData" :key="hash_id" v-show="info"
              @click="itemClick(info)">{{ info.name
              }}</box>
          </div>
          <el-button type="primary" class="mt-4" size="small" @click="$emit('create')">添加{{ props.alias
          }}</el-button>
        </el-tab-pane>
        <el-tab-pane :label="groupAlias">
          <el-tabs tab-position="right" @tab-click="groupTabClick">
            <el-tab-pane :key="group.hash_id" :label="group.name" v-for="group in groupData" :name="group.hash_id">
              <box size="sm" marign="none" v-for="scene in group.scenes" :key="scene"
                @click="itemClick(itemData[scene])">
                {{ itemData[scene].name }}</box>
            </el-tab-pane>
          </el-tabs>
          <el-button type="primary" class="mt-4" size="small" @click="$emit('createGroup')">添加{{ groupAlias
          }}</el-button>
        </el-tab-pane>
      </el-tabs>
    </box>
  </div>
</template>
<style>
.w-120 {
  width: 28rem;
}

.w-144 {
  width: 36rem;
}

.w-192 {
  width: 48rem;
}
</style>