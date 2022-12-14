<script setup>
import { computed, watch, ref, onMounted, defineProps, defineEmits } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"
import plural from 'plural';

const emit = defineEmits(['itemClick', 'groupClick', 'create', 'createGroup'])
const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object,
  name: String
})


const dataTypePlural = computed(() => {
  return plural(props.dataOption.dataType)
})
const groupAlias = computed(() => {
  return props.alias + "分组"
})

const groupData = computed(() => {
  let data = editorStore[props.dataOption.dataGroupType]
  let req = {}
  for (let item in data) {
    if (data[item] && data[item].plugin && data[item].plugin == props.name) {
      req[item] = data[item]
    }
  }
  return req
})
const itemData = computed(() => {
  let data = editorStore[props.dataOption.dataType]
  let req = {}
  for (let item in data) {
    if (data[item] && data[item].plugin && data[item].plugin == props.name) {
      req[item] = data[item]
    }
  }
  return req
})

const groupTabClick = function (pane) {
  emit('groupClick', groupData.value[pane.props.name])
}
const itemClick = function (item) {
  emit('itemClick', item)
}


</script>
<template>
  <div class="w-144">
    <box size="md">
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
              <box size="sm" marign="none" v-for="hash_id in group[dataTypePlural]" :key="hash_id"
                @click="itemClick(itemData[hash_id])">
                {{ itemData[hash_id].name }}</box>
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