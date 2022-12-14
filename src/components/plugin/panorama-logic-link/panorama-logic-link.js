import icon from "@/components/icon/panorama-logic-link.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
import createForm from "./createForm.vue"

const editorStore = useEditorStore();
export default {
  dataType: "logic",
  dataGroupType: "logicGroup",
  activeDataType: "activeLogic",
  activeDataGroupType: "activeLogicGroup",
  alias: "全景逻辑方法组",
  name: "panorama-logic-link",
  domElementId: "panorama",
  store: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      plugin: "panorama-logic-link"
    }
    editorStore.addHotspot(data)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-logic-link"
    }
    editorStore.addLogicGroup(data)
  },
  component: {
    icon: icon,
    createForm: createForm
  }
}