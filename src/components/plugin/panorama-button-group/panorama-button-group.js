import icon from "@/components/icon/panorama-button-group.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
export default {
  dataType: "button",
  dataGroupType: "buttonGroup",
  activeDataType: "activeButton",
  activeDataGroupType: "activeButtonGroup",
  alias: "全景按钮组",
  name: "panorama-button-group",
  domElementId: "panorama",
  store: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      plugin: "panorama-button-group"
    }
    editorStore.addHotspot(data)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-button-group"
    }
    editorStore.addLogicGroup(data)
  },
  component: {
    icon: icon
  }
}