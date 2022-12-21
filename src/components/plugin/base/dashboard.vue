<script setup>
import { computed, watch, ref, onMounted, defineProps, defineEmits } from "vue";
import { useEditorStore } from "@/stores/editor";
import box from "@/components/box.vue"
import plural from 'plural';
import { showHotspot } from "@/util/krpanoUtil"

const offsetValue = ref({})
const activeHotspotType = ref("")
const activeHotspotKrpanoName = ref("")

const track_mouse_interval = ref('')
const track_mouse_enabled = ref(false)
const hotspotOnclick = function (event) { }
const hotspotOndown = function (event) {
  let arg = event.hotspot.split('_');
  activeHotspotKrpanoName.value = arg[arg.length - 2] + "_" + arg[arg.length - 1]

  activeHotspotType.value = arg[arg.length - 2]
  editorStore.setActiveHotspot(editorStore.hotspot[arg[arg.length - 1]])

  track_mouse_enabled.value = true
  let krpano = document.getElementById('krpanoSWFObject')
  let pnt = krpano.screentosphere(
    krpano.get("mouse.x"),
    krpano.get("mouse.y")
  );
  console.log(editorStore.activeHotspot)
  offsetValue.value.x = Number(pnt.x.toFixed(2)) -
    Number(editorStore.activeHotspot.ath)
  offsetValue.value.y = Number(pnt.y.toFixed(2)) -
    Number(editorStore.activeHotspot.atv)

  track_mouse_interval.value = setInterval(() => {
    track_mouse_interval_callback()
  }, 100)
  console.log('按下')
}
const hotspotOnup = function (event) {
  track_mouse_enabled.value = false
  console.log('放开')
  clearInterval(track_mouse_interval.value)
  editorStore.updateHotspotByActiveHotspot()
  // editorStore.hotspot[editorStore.activeHotspot.value.hash_id].value = editorStore.activeHotspot.value

}
onMounted(() => {
  window.addEventListener('hotspotOnclick', hotspotOnclick)
  window.addEventListener('hotspotOndown', hotspotOndown)
  window.addEventListener('hotspotOnup', hotspotOnup)
})
function track_mouse_interval_callback () {
  let krpano = document.getElementById('krpanoSWFObject')
  let mx = krpano.get("mouse.x");
  let my = krpano.get("mouse.y");
  let pnt = krpano.screentosphere(mx, my);
  let h = pnt.x;
  let v = pnt.y;
  let [atv, ath] = [Number(v.toFixed(2)) - Number(offsetValue.value.y),
  Number(h.toFixed(2)) - Number(offsetValue.value.x)
  ]

  editorStore.updateActiveHotspot({
    atv: atv,
    ath: ath
  })

  krpano.set("hotspot[" + activeHotspotKrpanoName.value + "].atv", atv)
  krpano.set("hotspot[" + activeHotspotKrpanoName.value + "].ath", ath)
  // showHotspot(editorStore.activeHotspot.value, activeHotspotType.value)
}

const emit = defineEmits(['itemClick', 'groupClick', 'create', 'createGroup'])
const editorStore = useEditorStore();
const props = defineProps({
  alias: String,
  dataOption: Object,
  name: String
})

const activeScene = computed(() => {
  return editorStore.activeScene
})
const activeData = computed(() => {
  return editorStore[props.dataOption.activeDataType]
});

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
    if (data[item] && data[item].plugin && data[item].plugin == props.name && (!data[item].scene_id || data[item].scene_id == activeScene.value.hash_id)) {
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
    <box size="xs">
      <el-tabs>
        <el-tab-pane :label="props.alias">
          <div class="flex flex-row flex-wrap">
            <box size="sm" marign="none" class="mt-1" :bgColor="hash_id == activeData.hash_id ? 'bg-blue-200' : ''"
              v-for="(info, hash_id) in itemData" :key="hash_id"
              v-show="!info.scene_id || info.scene_id == activeScene.hash_id" @click="itemClick(info)">{{ info.name
              }}</box>
          </div>
          <el-button type="primary" class="mt-4" size="small" @click="$emit('create')">添加{{ props.alias
          }}</el-button>
        </el-tab-pane>
        <el-tab-pane :label="groupAlias">
          <el-tabs tab-position="right" @tab-click="groupTabClick">
            <el-tab-pane :key="group.hash_id" :label="group.name" v-for="group in groupData" :name="group.hash_id">
              <box size="sm" marign="none" class="mt-1" v-for="hash_id in group[dataTypePlural]" :key="hash_id"
                @click="itemClick(itemData[hash_id])"
                v-show="!itemData[hash_id].scene_id || itemData[hash_id].scene_id == activeScene.hash_id">
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