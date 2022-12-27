<script setup>
import { onMounted } from "vue";
import { useEditorStore } from "@/stores/editor";
const porps = defineProps({
  activePlugin: Object
})
const editorStore = useEditorStore();
onMounted(() => {
  let boxHeight = document.getElementById('panoramaBox').offsetHeight;
  document.getElementById('plugin-box').style.height = 'calc(' + boxHeight + 'px - 3.7rem)';
})

</script>
<template>
  <!-- <div class="absolute right-10 top-24" id="plugin-box"> -->
  <div id="plugin-box" style="width:36rem;">
    <!-- <div class="flex flex-row-reverse justify-center"> -->
    <div class="flex flex-col justify-start h-full">
      <el-scrollbar class="bg-white shadow-inner mt-1 h-1/3 overflow-y-auto rounded-md"
        v-show="editorStore.showDashboardVisible">
        <!-- <div class="bg-white shadow-inner mt-1 h-1/3 overflow-y-auto rounded-md"
          v-show="editorStore.showDashboardVisible"> -->
        <div v-show="editorStore.showDashboardVisible">
          <component :is="activePlugin.component.dashboard" @groupClick="activePlugin.groupClick"
            @itemClick="activePlugin.click" @createGroup="activePlugin.createGroup" @create="activePlugin.create"
            :dataOption="activePlugin.dataOption" :alias="activePlugin.alias" :name="activePlugin.name">
          </component>
        </div>
        <!-- </div> -->
      </el-scrollbar>
      <el-scrollbar class="bg-white shadow-inner mt-1 h-2/3 overflow-y-auto rounded-md"
        v-show="editorStore.showGroupUpdateFormVisible || editorStore.showGroupCreateFormVisible || editorStore.showUpdateFormVisible || editorStore.showCreateFormVisible">
        <!-- <div class="bg-white shadow-inner mt-1 h-2/3 overflow-y-auto rounded-md"
          v-show="editorStore.showGroupUpdateFormVisible || editorStore.showGroupCreateFormVisible || editorStore.showUpdateFormVisible || editorStore.showCreateFormVisible"> -->
        <div v-show="editorStore.showGroupUpdateFormVisible">
          <component :is="activePlugin.component.groupEditForm" @update="activePlugin.updateGroup"
            :defaultData="activePlugin.activeGroupData" :field="activePlugin.fieldOption.groupUpdateField"
            :dataOption="activePlugin.dataOption" :alias="activePlugin.alias" :name="activePlugin.name">
          </component>
        </div>
        <div v-show="editorStore.showGroupCreateFormVisible">
          <component :is="activePlugin.component.groupCreateForm" @store="activePlugin.storeGroup"
            :field="activePlugin.fieldOption.groupStoreField" :dataOption="activePlugin.dataOption"
            :alias="activePlugin.alias" :name="activePlugin.name">
          </component>
        </div>
        <div v-show="editorStore.showUpdateFormVisible">
          <component :is="activePlugin.component.editForm" @update="activePlugin.update"
            :defaultData="activePlugin.activeData" :field="activePlugin.fieldOption.updateField"
            :dataOption="activePlugin.dataOption" :alias="activePlugin.alias" :name="activePlugin.name">
          </component>
        </div>
        <div v-show="editorStore.showCreateFormVisible">
          <component :is="activePlugin.component.createForm" @store="activePlugin.store"
            :field="activePlugin.fieldOption.storeField" :dataOption="activePlugin.dataOption"
            :alias="activePlugin.alias" :name="activePlugin.name">
          </component>
        </div>
        <!-- </div> -->
      </el-scrollbar>
      <!-- <el-scrollbar class="bg-white shadow-inner mt-1 h-2/3 overflow-y-auto rounded-md"
        v-show="editorStore.showGroupInfoVisible || editorStore.showInfoVisible"> -->
      <div class="bg-white shadow-inner mt-1 h-2/3 overflow-y-auto rounded-md"
        v-show="editorStore.showGroupInfoVisible || editorStore.showInfoVisible">
        <div v-show="editorStore.showGroupInfoVisible">
          <component :is="activePlugin.component.groupInfo" @editGroup="activePlugin.editGroup"
            @delGroup="activePlugin.delGroup" :dataOption="activePlugin.dataOption" :alias="activePlugin.alias"
            :name="activePlugin.name">
          </component>
        </div>
        <div v-show="editorStore.showInfoVisible">
          <component :is="activePlugin.component.info" @del="activePlugin.del" @edit="activePlugin.edit"
            :dataOption="activePlugin.dataOption" :alias="activePlugin.alias" :name="activePlugin.name">
          </component>
        </div>
      </div>
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>