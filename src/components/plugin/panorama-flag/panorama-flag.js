import icon from "@/components/icon/panorama-flag.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
import createForm from "./createForm.vue"
import editForm from "./editForm.vue"
import { showHotspot } from "@/util/krpanoUtil";

const editorStore = useEditorStore();


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
      atv: krpano.get("view.vlookat"),
      group_id: formData.group_id
    }
    showHotspot(data, 'flag')
    editorStore.addHotspot(data)
  },
  update: (newData, oldData) => {
    showHotspot(newData, 'flag')
    editorStore.updateHotspot(newData, oldData)
  },
  delGroup: (hash_id) => {
    editorStore.delHotspotGroup(hash_id)
  },
  del: (hash_id) => {
    editorStore.delHotspot(hash_id)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-flag"
    }
    editorStore.addHotspotGroup(data)
  },
  component: {
    icon: icon,
    createForm: createForm,
    editForm: editForm
  }
}