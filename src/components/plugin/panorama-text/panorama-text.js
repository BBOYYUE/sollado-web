import panoramaText from "@/components/icon/panorama-text.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
export default {
  dataType: "text",
  dataGroupType: "textGroup",
  activeDataType: "activeText",
  activeDataGroupType: "activeTextGroup",
  alias: "全景文本",
  name: "panorama-text",
  domElementId: "panorama",
  store: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      url: formData.url,
      plugin: "panorama-text"
    }
    editorStore.addText(data)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-text"
    }
    editorStore.addTextGroup(data)
  },
  component: {
    icon: panoramaText
  }
}