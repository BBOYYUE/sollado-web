import panoramaHotspot from "@/components/icon/panorama-hotspot.vue"
import info from "./info.vue"
// import createForm from "@/components/plugin/panorama-hotspot/createForm.vue"
import createForm from "./createForm.vue"
import editForm from "./editForm.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
const template = {
  onloaded: 'hotspot_animate();add_all_the_time_tooltip();',
  edge: 'top',
  distorted: false,
  scale: '0.4',
  crop: '0|0|128|128',
  framewidth: '128',
  frameheight: '128',
  frame: 0,
  zoom: false,
  onclick: 'hotspotOnclick',
  ondown: 'hotspotOndown',
  onup: 'hotspotOnup',
  lastframe: 24,
  visible: true
}
const editorStore = useEditorStore();
function showHotspot (data) {
  let krpano = document.getElementById('krpanoSWFObject')
  let option = Object.assign({}, template, data)
  option.name = 'hotspot_' + data.hash_id
  let flag = krpano.get("hotspot[" + option.name + "]")
  if (!flag) {
    krpano.call("addhotspot(" + option.name + ")")
  } else {
    krpano.call("removehotspot(" + option.name + ")")
    krpano.call("addhotspot(" + option.name + ")")
  }
  for (let item in option) {
    krpano.set(
      "hotspot[" + 'hotspot_' + option.hash_id + "]." + item,
      option[item]
    );
  }
}
export default {
  dataType: "hotspot",
  dataGroupType: "hotspotGroup",
  activeDataType: "activeHotspot",
  activeDataGroupType: "activeHotspotGroup",
  alias: "全景热点",
  name: "panorama-hotspot",
  domElementId: "panorama",
  store: (formData) => {
    let krpano = document.getElementById('krpanoSWFObject')
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      plugin: "panorama-hotspot",
      text: formData.name,
      ath: krpano.get("view.hlookat"),
      atv: krpano.get("view.vlookat")
    }
    showHotspot(data)
    editorStore.addHotspot(data)
  },
  update: (newData, oldData) => {
    showHotspot(newData)
    editorStore.updateHotspot(newData, oldData)
  },


  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-hotspot"
    }
    editorStore.addHotspotGroup(data)
  },
  component: {
    icon: panoramaHotspot,
    createForm: createForm,
    editForm: editForm,
    info: info
  }
}