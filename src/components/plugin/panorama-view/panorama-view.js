import icon from "@/components/icon/panorama-view.vue"
import { v4 as uuid } from "uuid";
import { useEditorStore } from "@/stores/editor";
import createForm from "@/components/plugin/panorama-view/createForm.vue"
import editForm from "@/components/plugin/panorama-view/editForm.vue"
import info from "@/components/plugin/panorama-view/info.vue"
import { findProp } from "@vue/compiler-core";

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
      hlookat: formData.hlookat,
      vlookat: formData.vlookat,
      fov: formData.fov,
      fovmax: formData.fovmax,
      fovmin: formData.fovmin,
      maxpixelzoom: formData.maxpixelzoom,
      group_id: formData.group_id,
      plugin: "panorama-view"
    }
    editorStore.addView(data)
  },
  update: (newData, oldData) => {
    editorStore.updateView(newData, oldData)
  },
  storeGroup: (formData) => {
    let data = {
      hash_id: uuid().split("-")[0],
      name: formData.name,
      plugin: "panorama-view"
    }
    editorStore.addViewGroup(data)
  },
  delGroup: (hash_id) => {
    editorStore.delViewGroup(hash_id)
  },
  del: (hash_id) => {
    editorStore.delView(hash_id)
  },
  component: {
    icon: icon,
    createForm: createForm,
    editForm: editForm,
    info: info
  }
}