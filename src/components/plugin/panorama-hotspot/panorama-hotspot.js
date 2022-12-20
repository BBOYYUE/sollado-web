import panoramaHotspot from "@/components/icon/panorama-hotspot.vue"
import info from "./info.vue"
// import createForm from "@/components/plugin/panorama-hotspot/createForm.vue"
import createForm from "./createForm.vue"
import editForm from "./editForm.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
import { showHotspot } from "@/util/krpanoUtil.js";

const editorStore = useEditorStore();

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
      atv: krpano.get("view.vlookat"),
      linklandce: formData.linklandce,
      group_id: formData.group_id
    }
    showHotspot(data, 'hotspot')
    editorStore.addHotspot(data)
  },
  update: (newData, oldData) => {
    showHotspot(newData, 'hotspot')
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
      plugin: "panorama-hotspot"
    }
    editorStore.addHotspotGroup(data)
  },
  component: {
    icon: panoramaHotspot,
    createForm: createForm,
    editForm: editForm
  }
}