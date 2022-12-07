import icon from "@/components/icon/panorama-scene.vue"
import groupInfo from "@/components/plugin/panorama-scene/groupInfo.vue"
import groupCreateForm from "@/components/plugin/panorama-scene/groupCreateForm.vue"
import info from "@/components/plugin/panorama-scene/info.vue"
import createForm from "@/components/plugin/panorama-scene/createForm.vue"

export default {
  dataType: "scene",
  dataGroupType: "sceneGroup",
  activeDataType: "activeScene",
  activeDataGroupType: "activeSceneGroup",
  alias: "场景",
  name: "scene",
  domElementId: "panorama",
  click: (panorama) => {
    console.log(panorama)
  },
  create: () => { },
  edit: () => { },
  update: () => { },
  store: () => { },

  groupClick: (group) => {
    console.log(group)
  },
  createGroup: () => { },
  editGroup: () => { },
  updateGroup: () => { },
  storeGroup: () => { },

  component: {
    icon: icon,
    info: info,
    groupInfo: groupInfo,
    groupCreateForm: groupCreateForm,
    createForm: createForm
  }
}