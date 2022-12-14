import panoramaLogic from "@/components/icon/panorama-logic.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
export default {
  dataType: "logic",
  dataGroupType: "logicGroup",
  activeDataType: "activeLogic",
  activeDataGroupType: "activeLogicGroup",
  alias: "全景逻辑方法",
  name: "panorama-logic",
  domElementId: "panorama",
  store: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      plugin: "panorama-logic"
    }
    editorStore.addHotspot(data)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-logic"
    }
    editorStore.addLogicGroup(data)
  },
  component: {
    icon: panoramaLogic
  }
}