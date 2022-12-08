import icon from "@/components/icon/panorama-editor.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();

export default {
  dataType: "editor",
  dataGroupType: "",
  alias: "全景代码编辑器",
  name: "panorama-editor",
  domElementId: "panorama",
  component: {
    icon: icon,
  }
}