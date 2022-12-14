import icon from "@/components/icon/panorama-flag.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
import createForm from "./createForm.vue"
import editForm from "./editForm.vue"

const editorStore = useEditorStore();
const template = {
  scale: '0.5',
  crop: '0|0|1|32',
  frameheight: 32,
  onclick: 'hotspotOnclick',
  ondown: 'hotspotOndown',
  onup: 'hotspotOnup',
  edge: 'bottom',
  distorted: false,
  zoom: false,
  onloaded: 'set_flag',
  url: '%SWFPATH%/skin/line.jpg',
  visible: true
}
function showFlag (data) {
  let krpano = document.getElementById('krpanoSWFObject')
  let option = Object.assign({}, template, data)
  option.name = 'flag_' + data.hash_id
  console.log(option)

  let flag = krpano.get("hotspot[" + option.name + "]")
  if (!flag) {
    krpano.call("addhotspot(" + option.name + ")")
  } else {
    krpano.call("removehotspot(" + option.name + ")")
    krpano.call("addhotspot(" + option.name + ")")
  }
  for (let item in option) {
    krpano.set(
      "hotspot[" + option.name + "]." + item,
      option[item]
    );
  }
}
export default {
  dataType: "hotspot",
  dataGroupType: "hotspotGroup",
  activeDataType: "activeHotspot",
  activeDataGroupType: "activeHotspotGroup",
  alias: "全景标牌",
  name: "panorama-flag",
  domElementId: "panorama",
  store: (formData) => {
    let krpano = document.getElementById('krpanoSWFObject')
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      styleUuid: formData.styleUuid,
      css: formData.css,
      mobilecss: formData.mobilecss,
      plugin: "panorama-flag",
      text: formData.name,
      ath: krpano.get("view.hlookat"),
      atv: krpano.get("view.vlookat")
    }
    showFlag(data)
    editorStore.addHotspot(data)
  },
  update: (newData, oldData) => {
    showFlag(newData)
    editorStore.updateHotspot(newData, oldData)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-flag"
    }
  },
  component: {
    icon: icon,
    createForm: createForm,
    editForm: editForm
  }
}