import panoramaButton from "@/components/icon/panorama-button.vue"
// import createForm from "./createForm.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
export default {
  dataType: "button",
  dataGroupType: "buttonGroup",
  activeDataType: "activeButton",
  activeDataGroupType: "activeButtonGroup",
  alias: "全景按钮",
  name: "panorama-button",
  domElementId: "panorama",
  store: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      plugin: "panorama-button"
    }
    editorStore.addButton(data)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-button"
    }
    editorStore.addButtonGroup(data)
  },
  component: {
    icon: panoramaButton,
  }
}