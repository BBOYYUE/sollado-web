<script setup>

</script>
<template>
  <div class="shadow-md border border-solid border-gray-100 rounded-md mx-4 p-6 bg-white bg-opacity-25">
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
</template>