import icon from "@/components/icon/panorama-flag.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();

export default {
  dataType: "hotspot",
  dataGroupType: "hotspotGroup",
  activeDataType: "activeHotspot",
  activeDataGroupType: "activeHotspotGroup",
  alias: "全景标牌",
  name: "panorama-flag",
  domElementId: "panorama",
  component: {
    icon: icon,
  }
}