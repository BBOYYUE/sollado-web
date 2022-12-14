import icon from "@/components/icon/panorama-scene.vue"
import groupInfo from "@/components/plugin/panorama-scene/groupInfo.vue"
import info from "@/components/plugin/panorama-scene/info.vue"
import createForm from "@/components/plugin/panorama-scene/createForm.vue"
import editForm from "@/components/plugin/panorama-scene/editForm.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();

export default {
  dataType: "scene",
  dataGroupType: "sceneGroup",
  activeDataType: "activeScene",
  activeDataGroupType: "activeSceneGroup",
  alias: "全景场景",
  name: "panorama-scene",
  domElementId: "panorama",
  store: (formData) => {
    let data = {}
    formData.map((panorama) => {
      if (!data[panorama.hash_id]) {
        panorama.plugin = 'panorama-scene'
        data[panorama.hash_id] = panorama
      }
    })
    editorStore.addScene(data)
  },
  update: (newData, oldData) => {
    editorStore.updateScene(newData, oldData)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-scene"
    }
    editorStore.addSceneGroup(data)
  },

  component: {
    icon: icon,
    info: info,
    groupInfo: groupInfo,
    createForm: createForm,
    editForm: editForm
  }
}