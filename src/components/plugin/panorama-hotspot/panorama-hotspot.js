import panoramaHotspot from "@/components/icon/panorama-hotspot.vue"
// import createForm from "@/components/plugin/panorama-hotspot/createForm.vue"
import createForm from "./createForm.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

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
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      plugin: "panorama-hotspot"
    }
    editorStore.addHotspot(data)
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
    createForm: createForm
  }
}