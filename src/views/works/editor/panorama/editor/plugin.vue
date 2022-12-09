<script setup>
import { useEditorStore } from "@/stores/editor";
const porps = defineProps({
  activePlugin: Object
})
const editorStore = useEditorStore();
</script>
<template>
  <div class="absolute right-10 top-24">
    <div class="flex flex-row-reverse justify-center">
      <div v-show="editorStore.showDashboardVisible">
        <component :is="activePlugin.component.dashboard" @groupClick="activePlugin.groupClick"
          @itemClick="activePlugin.click" @createGroup="activePlugin.createGroup" @create="activePlugin.create"
          :dataOption="activePlugin.dataOption" :alias="activePlugin.alias" :name="activePlugin.name">
        </component>
      </div>
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
          :field="activePlugin.fieldOption.storeField" :dataOption="activePlugin.dataOption" :alias="activePlugin.alias"
          :name="activePlugin.name">
        </component>
      </div>
      <div v-show="editorStore.showGroupInfoVisible">
        <component :is="activePlugin.component.groupInfo" @editGroup="activePlugin.editGroup"
          :dataOption="activePlugin.dataOption" :alias="activePlugin.alias" :name="activePlugin.name">
        </component>
      </div>
      <div v-show="editorStore.showInfoVisible">
        <component :is="activePlugin.component.info" @edit="activePlugin.edit" :dataOption="activePlugin.dataOption"
          :alias="activePlugin.alias" :name="activePlugin.name">
        </component>
      </div>
    </div>
  </div>
</template>