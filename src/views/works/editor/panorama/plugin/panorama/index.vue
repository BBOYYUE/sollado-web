<script setup>
import { onActivated, onMounted, watch, ref, computed } from "vue";
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
import Hostpot from './hotspot.js'

const editorStore = useEditorStore()
const hostpotImpl = new Hostpot()
const form = ref({})
const info = ref({})
const showForm = ref(false)
const showInfo = ref(false)
const formType = ref('group')
const infoType = ref('group')


const showGroupForm = computed(() => {
  return showForm.value && formType.value == 'group' ? true : false
})
const showHotspotForm = computed(() => {
  return showForm.value && formType.value == 'hotspot' ? true : false
})
const showGroupInfo = computed(() => {
  return showInfo.value && infoType.value == 'group' ? true : false
})
const showHotspotInfo = computed(() => {
  return showInfo.value && infoType.value == 'hotspot' ? true : false
})


const componentClass = "shadow-md border border-solid border-gray-100 rounded-md mx-4 p-6 bg-white bg-opacity-25"

const toggleForm = function (val) {
  showForm.value = val
}
const toggleInfo = function (val) {
  showInfo.value = val
}
const hotspotGroupTabClick = function (group) {
  info.value = group
  infoType.value = 'group'
  toggleForm(false)
  toggleInfo(true)
}
const hotspotClick = function (hotspot) {
  info.value = hotspot
  infoType.value = 'hotspot'
  toggleForm(false)
  toggleInfo(true)
}
const createGroup = function () {
  formType.value = 'group'
  toggleForm(true)
  toggleInfo(false)
}
const createHotspot = function () {
  formType.value = 'hotspot'
  toggleForm(true)
  toggleInfo(false)
}
const editGroup = function (group) {
  form.value = group
  formType.value = 'group'
  editorStore.setActiveHotspotGroup(group)
  toggleForm(true)
  toggleInfo(false)
}
const editHotspot = function (hotspot) {
  form.value = hotspot
  formType.value = 'hotspot'
  editorStore.setActiveHotspot(hotspot)
  toggleForm(true)
  toggleInfo(false)
}


const storeGroup = function (group) { }
const storePanorama = function (hotspot) { }
const updateGroup = function (group) { }
const updateHotspot = function (hotspot) { }


</script>
<template>
  <div class="flex flex-row justify-between divide-x divide-gray-300 divide-solid ">
      <!--仪表板 -->
    <component :is="hostpotImpl.component.dashboard" :class="componentClass" @groupClick="hotspotGroupTabClick"
      @hotspotClick="hotspotClick" @createGroup="createGroup" @createHotspot="createHotspot"></component>
    <component :is="hostpotImpl.component.form.groupForm" :class="componentClass" v-show="showGroupForm"
      :defaultData="{}" @storeGroup="storeGroup" @updateGroup="updateGroup">
    </component>
    <component :is="hostpotImpl.component.form.form" :class="componentClass" v-show="showHotspotForm" :defaultData="{}"
      @storeHotspot="storeHotspot" @updateHotspot="updateHotspot" :hotspotStyleList="hostpotImpl.getStyleList()">
    </component>
    <component :is="hostpotImpl.component.info.groupInfo" :class="componentClass" v-show="showGroupInfo"
      @editGroup="editGroup"></component>
    <component :is="hostpotImpl.component.info.info" :class="componentClass" v-show="showHotspotInfo"
      @editHotspot="editHotspot"></component>
    <component :is="hotspotImpl.component.form.create"></component>
  </div>