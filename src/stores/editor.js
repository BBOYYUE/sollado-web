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
      activeView: {},
      acitveViewGroup: {},

      work: {},
      scene: {},
      sceneGroup: {},
      hotspot: {},
      hotspotGroup: {},
      view: {},
      viewGroup: {},

      // layer: {},
      // layerGroup: {},
      // logic: {},
      // logicGroup: {},
      // button: {},
      // buttonGroup: {},

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
    getPanorama(id) {
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
    setActiveSceneGroup(activeSceneGroup) {
      console.log(activeSceneGroup)
      this.activeSceneGroup = activeSceneGroup
    },
    setActiveScene(activeScene) {
      this.activeScene = activeScene
    },
    addScene(scene) {
      // 最后加入到 scene 中
      this.scene = Object.assign({}, this.scene, scene);
    },
    addSceneGroup(scene_group) {
      this.sceneGroup[scene_group.hash_id] = Object.assign({}, scene_group, {
        scenes: new Set()
      });
    },
    updateScene(newData, oldData) {
      this.scene[newData.hash_id] = newData
      if (oldData.group_id) this.sceneGroup[oldData.group_id].scenes.delete(newData.hash_id)
      if (newData.group_id) this.sceneGroup[newData.group_id].scenes.add(newData.hash_id)
    },
    delScene(hash_id) {
      let scene = this.scene[hash_id]
      if (scene.group_id) this.sceneGroup[scene.group_id].secnes.delete(hash_id)
      delete this.scene[hash_id]
    },
    delSceneGroup(hash_id) {
      delete this.sceneGroup[hash_id]
    },

    addView(view) {
      view.scene_id = this.activeScene.hash_id
      this.view[view.hash_id] = view;
      if (!this.activeScene.views) this.activeScene.views = new Set()
      this.activeScene.views.add(view.hash_id)
      this.scene[this.activeScene.hash_id] = this.activeScene
      console.log(view, this.activeScene)
      if (view.group_id) this.viewGroup[view.group_id].views.add(view.hash_id)
    },
    updateView(newData, oldData) {
      this.view[newData.hash_id] = newData
      if (oldData.group_id) this.viewGroup[oldData.group_id].views.delete(newData.hash_id)
      if (newData.group_id) this.viewGroup[newData.group_id].views.add(newData.hash_id)
    },
    addViewGroup(viewGroup) {
      this.viewGroup[viewGroup.hash_id] = Object.assign({}, viewGroup, {
        views: new Set()
      })
    },
    delView(hash_id) {
      let view = this.view[hash_id]
      this.scene[view.scene_id].views.delete(hash_id)
      if (view.group_id) this.viewGroup[view.group_id].views.delete(hash_id)
      delete this.view[hash_id]
    },
    delViewGroup(hash_id) {
      delete this.viewGroup[hash_id]
    },

    setActiveHotspot(activeHotspot) {
      this.activeHotspot = activeHotspot
    },
    setActiveHotspotGroup(activeHotspotGroup) {
      this.activeHotspotGroup = activeHotspotGroup
    },
    addHotspot(hotspot) {
      hotspot.scene_id = this.activeScene.hash_id
      this.hotspot[hotspot.hash_id] = hotspot;
      if (!this.activeScene.hotspots) this.activeScene.hotspots = new Set()
      this.activeScene.hotspots.add(hotspot.hash_id)
      this.scene[this.activeScene.hash_id] = this.activeScene
      if (hotspot.group_id) this.hotspotGroup[hotspot.group_id].hotspots.add(hotspot.hash_id)
    },
    updateHotspot(newData, oldData) {
      this.hotspot[newData.hash_id] = newData
      if (oldData.group_id) this.hotspotGroup[oldData.group_id].hotspots.delete(newData.hash_id)
      if (newData.group_id) this.hotspotGroup[newData.group_id].hotspots.add(newData.hash_id)
    },
    addHotspotGroup(hotspotGroup) {
      this.hotspotGroup[hotspotGroup.hash_id] = Object.assign({}, hotspotGroup, {
        hotspots: new Set()
      })
    },
    delHotspot(hash_id) {
      let hotspot = this.hotspot[hash_id]
      this.scene[hotspot.scene_id].hotspots.delete(hash_id)
      if (hotspot.group_id) this.hotspotGroup[hotspot.group_id].hotspots.delete(hash_id)
      delete this.hotspot[hash_id]
    },
    delHotspotGroup(hash_id) {
      delete this.hotspotGroup[hash_id]
    },

    setActiveLayer(activeLayer) {
      this.activeLayer = activeLayer
    },
    setActiveLayerGroup(activeLayerGroup) {
      this.activeLayerGroup = activeLayerGroup
    },
    addLayer(layer) {
      this.layer[layer.hash_id] = layer;
    },
    updateLayer(newData, oldData) {
      this.layer[newData.hash_id] = newData
      if (oldData.group_id) this.layerGroup[oldData.group_id].layers.delete(newData.hash_id)
      if (newData.group_id) this.layerGroup[newData.group_id].layers.add(newData.hash_id)
    },
    addLayerGroup(layerGroup) {
      this.layerGroup[layerGroup.hash_id] = Object.assign({}, layerGroup, {
        layers: new Set()
      })
    },


    setActiveLogic(activeLogic) {
      this.activeLogic = activeLogic
    },
    setActiveLogicGroup(activeLogicGroup) {
      this.activeLogicGroup = activeLogicGroup
    },
    addLogic(logic) {
      this.logic[logic.hash_id] = logic;
    },
    addLogicGroup(logicGroup) {
      this.logicGroup[logicGroup.hash_id] = Object.assign({}, logicGroup, {
        logics: new Set()
      })
    },

    setActiveButton(activeButton) {
      this.activeButton = activeButton
    },
    setActiveButtonGroup(activeButtonGroup) {
      this.activeButtonGroup = activeButtonGroup
    },
    addButton(button) {
      this.button[button.hash_id] = button;
    },
    addButtonGroup(buttonGroup) {
      this.buttonGroup[buttonGroup.hash_id] = Object.assign({}, buttonGroup, {
        buttons: new Set()
      })
    },

    setActiveView(activeView) {
      this.activeView = activeView
    },
    setActiveViewGroup(activeViewGroup) {
      this.activeViewGroup = activeViewGroup
    },


    hideAll() {
      this.showDashboardVisible = false
      this.showGroupCreateFormVisible = false
      this.showGroupUpdateFormVisible = false
      this.showCreateFormVisible = false
      this.showUpdateFormVisible = false
      this.showGroupInfoVisible = false
      this.showInfoVisible = false
    },

    showDashboard() {
      this.hideAll()
      this.showDashboardVisible = true
    },
    showInfo() {
      this.hideAll()
      this.showInfoVisible = true
      this.showDashboardVisible = true
    },
    showCreate() {
      this.hideAll()
      this.showCreateFormVisible = true
      this.showDashboardVisible = true
    },

    showEdit() {
      this.hideAll()
      this.showUpdateFormVisible = true
      this.showDashboardVisible = true
    },

    showCreateGroup() {
      this.hideAll()
      this.showGroupCreateFormVisible = true
      this.showDashboardVisible = true
    },
    showEditGroup() {
      this.hideAll()
      this.showGroupUpdateFormVisible = true
      this.showDashboardVisible = true
    },

    showInfoGroup() {
      this.hideAll()
      this.showGroupInfoVisible = true
      this.showDashboardVisible = true
    }


  }
});