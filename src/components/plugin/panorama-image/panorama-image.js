import icon from "@/components/icon/panorama-image.vue"
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
  alias: "全景热点图片",
  name: "panorama-image",
  domElementId: "panorama",
  store: (formData) => {
    let krpano = document.getElementById('krpanoSWFObject')
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      scale: formData.scale,
      plugin: "panorama-image",
      text: formData.name,
      ath: krpano.get("view.hlookat"),
      atv: krpano.get("view.vlookat"),
      group_id: formData.group_id
    }
    showHotspot(data, 'image')
    editorStore.addHotspot(data)
  },
  update: (newData, oldData) => {
    showHotspot(newData, 'image')
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
      plugin: "panorama-image"
    }
    editorStore.addHotspotGroup(data)
  },
  component: {
    icon: icon,
    createForm: createForm,
    editForm: editForm
  }
}