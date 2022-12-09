import panoramaLayer from "@/components/icon/panorama-layer.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
export default {
  dataType: "layer",
  dataGroupType: "layerGroup",
  activeDataType: "activeLayer",
  activeDataGroupType: "activeLayerGroup",
  alias: "全景容器",
  name: "panorama-layer",
  domElementId: "panorama",
  store: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      plugin: "panorama-layer"
    }
    editorStore.addText(data)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-layer"
    }
    editorStore.addTextGroup(data)
  },
  component: {
    icon: panoramaLayer
  }
}