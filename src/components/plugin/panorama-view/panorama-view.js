import icon from "@/components/icon/panorama-view.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
export default {
  dataType: "view",
  dataGroupType: "viewGroup",
  activeDataType: "activeView",
  activeDataGroupType: "activeViewGroup",
  alias: "全景视角",
  name: "panorama-view",
  domElementId: "panorama",
  store: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      plugin: "panorama-view"
    }
    editorStore.addText(data)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-view"
    }
    editorStore.addViewGroup(data)
  },
  component: {
    icon: icon
  }
}