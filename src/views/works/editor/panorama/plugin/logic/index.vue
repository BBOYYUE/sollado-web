<script setup>
import { onActivated, onMounted, watch, ref, computed } from "vue";
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
import Logic from './logic.js'

const editorStore = useEditorStore()
const logicImpl = new Logic()
const form = ref({})
const info = ref({})
const showForm = ref(false)
const showInfo = ref(false)
const formType = ref('group')
const infoType = ref('group')


const showGroupForm = computed(() => {
  return showForm.value && formType.value == 'group' ? true : false
})
const showLogicForm = computed(() => {
  return showForm.value && formType.value == 'logic' ? true : false
})
const showLogicGroupInfo = computed(() => {
  return showInfo.value && infoType.value == 'group' ? true : false
})
const showLogicInfo = computed(() => {
  return showInfo.value && infoType.value == 'logic' ? true : false
})


const componentClass = "shadow-md border border-solid border-gray-100 rounded-md mx-4 p-6 bg-white bg-opacity-25"

const toggleForm = function (val) {
  showForm.value = val
}
const toggleInfo = function (val) {
  showInfo.value = val
}
const logicGroupTabClick = function (group) {
  info.value = group
  infoType.value = 'group'
  toggleForm(false)
  toggleInfo(true)
}
const logicClick = function (logic) {
  info.value = logic
  infoType.value = 'logic'
  toggleForm(false)
  toggleInfo(true)
}
const createGroup = function () {
  formType.value = 'group'
  toggleForm(true)
  toggleInfo(false)
}
const createLogic = function () {
  formType.value = 'logic'
  toggleForm(true)
  toggleInfo(false)
}
const editGroup = function (group) {
  form.value = group
  formType.value = 'group'
  editorStore.setActiveLogicGroup(group)
  toggleForm(true)
  toggleInfo(false)
}
const editLogic = function (logic) {
  form.value = logic
  formType.value = 'logic'
  editorStore.setActiveLogic(logic)
  toggleForm(true)
  toggleInfo(false)
}


const storeGroup = function (group) { }
const storeLogic = function (logic) { }
const updateGroup = function (group) { }
const updateLogic = function (logic) { }



</script>
<template>
  <div class="flex flex-row justify-between divide-x divide-gray-300 divide-solid ">
    <!--仪表板 -->
    <component :is="logicImpl.component.dashboard" :class="componentClass" @groupClick="logicGroupTabClick"
      @logicClick="logicClick" @createGroup="createGroup" @createlogic="createlogic"></component>
    <component :is="logicImpl.component.form.groupForm" :class="componentClass" v-show="showGroupForm" :defaultData="{}"
      @storeGroup="storeGroup" @updateGroup="updateGroup">
    </component>
    <component :is="logicImpl.component.form.form" :class="componentClass" v-show="showlogicForm" :defaultData="{}"
      @storelogic="storelogic" @updatelogic="updatelogic" :logicStyleList="logicImpl.getStyleList()">
    </component>
    <component :is="logicImpl.component.info.groupInfo" :class="componentClass" v-show="showGroupInfo"
      @editGroup="editGroup"></component>
    <component :is="logicImpl.component.info.info" :class="componentClass" v-show="showlogicInfo"
      @editlogic="editlogic"></component>
  </div>
</template>