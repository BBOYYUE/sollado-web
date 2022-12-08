import { defineStore } from "pinia";
import http from "@/util/http";
import * as api from "../util/api";
import queryBuilder from "../util/queryBuilder";
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();

export const useEditorStore = defineStore("editor", {
  state: () => {
    return {
      activeSceneGroup: {},
      activeScene: {},
      activeHotspot: {},
      activeHotspotGroup: {},
      work: {},
      scene: {},
      sceneGroup: {},
      hotspot: {},
      hotspotGroup: {},
      layer: {},
      layerGroup: {},
      view: {},
      viewGroup: {},
      logic: {},
      logicGroup: {},
      button: {},
      buttonGroup: {},

      showDashboardVisible: false,
      showGroupCreateFormVisible: false,
      showGroupUpdateFormVisible: false,
      showGroupInfoVisible: false,

      showCreateFormVisible: false,
      showUpdateFormVisible: false,
      showInfoVisible: false
    }
  },
  actions: {
    getPanorama (id) {
      appStore.loading();
      http()
        .get(api.host + api.panoramaWork + id)
        .then((res) => {
          let respond = res.data;
          if (respond.code == 200) {
            this.work = respond.data;
          }
          appStore.ready();
        });
    },
    setActiveSceneGroup (activeSceneGroup) {
      console.log(activeSceneGroup)
      this.activeSceneGroup = activeSceneGroup
    },
    setActiveScene (activeScene) {
      this.activeScene = activeScene
    },
    addScene (scene) {
      // if (!this.work.scenes) {
      //   this.work.scenes = []
      // }
      // this.work.scenes.push(Object.keys(scene))

      // 最后加入到 scene 中
      this.scene = Object.assign({}, this.scene, scene);
    },
    addSceneGroup (scene_group) {
      this.sceneGroup[scene_group.hash_id] = Object.assign({}, scene_group, {
        scenes: []
      });
      // if (!this.work.sceneGroups) {
      //   this.work.sceneGroups = []
      // }
      // this.work.sceneGroups.push(scene_group.hash_id)
    },

    setActiveHotspot (activeHotspot) {
      this.activeHotspot = activeHotspot
    },
    setActiveHotspotGroup (activeHotspotGroup) {
      this.activeHotspotGroup = activeHotspotGroup
    },
    addHotspot (hotspot) {
      console.log(hotspot)
      this.hotspot[hotspot.hash_id] = hotspot;
      console.log(this.hotspot)

    },
    addHotspotGroup (hotspotGroup) {
      this.hotspotGroup[hotspotGroup.hash_id] = Object.assign({}, hotspotGroup, {
        hotspots: []
      })
    },


    setActiveLogic (activeLogic) {
      this.activeLogic = activeLogic
    },
    setActiveLogicGroup (activeLogicGroup) {
      this.activeLogicGroup = activeLogicGroup
    },
    addLogic (logic) {
      this.logic[logic.hash_id] = logic;
    },
    addLogicGroup (logicGroup) {
      this.logicGroup[logicGroup.hash_id] = Object.assign({}, logicGroup, {
        logics: []
      })
    },

    setActiveButton (activeButton) {
      this.activeButton = activeButton
    },
    setActiveButtonGroup (activeButtonGroup) {
      this.activeButtonGroup = activeButtonGroup
    },
    addButton (button) {
      this.button[button.hash_id] = button;
    },
    addButtonGroup (buttonGroup) {
      this.buttonGroup[buttonGroup.hash_id] = Object.assign({}, buttonGroup, {
        buttons: []
      })
    },

    hideAll () {
      this.showDashboardVisible = false
      this.showGroupCreateFormVisible = false
      this.showGroupUpdateFormVisible = false
      this.showCreateFormVisible = false
      this.showUpdateFormVisible = false
      this.showGroupInfoVisible = false
      this.showInfoVisible = false
    },

    showDashboard () {
      this.hideAll()
      this.showDashboardVisible = true
    },
    showInfo () {
      this.hideAll()
      this.showInfoVisible = true
      this.showDashboardVisible = true
    },
    showCreate () {
      this.hideAll()
      this.showCreateFormVisible = true
      this.showDashboardVisible = true
    },

    showEdit () {
      this.hideAll()
      this.showUpdateFormVisible = true
      this.showDashboardVisible = true
    },

    showCreateGroup () {
      this.hideAll()
      this.showGroupCreateFormVisible = true
      this.showDashboardVisible = true
    },
    showEditGroup () {
      this.hideAll()
      this.showGroupUpdateFormVisible = true
      this.showDashboardVisible = true
    },

    showInfoGroup () {
      this.hideAll()
      this.showGroupInfoVisible = true
      this.showDashboardVisible = true
    }


  }
});