import { defineStore } from "pinia";
import http from "@/util/http";
import * as api from "../util/api";
import queryBuilder from "../util/queryBuilder";
import { useAppStore } from "@/stores/app";
import jsonStringify from "@/util/jsonStringify"
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
    hideAll() {
      this.showDashboardVisible = false
      this.showGroupCreateFormVisible = false
      this.showGroupUpdateFormVisible = false
      this.showCreateFormVisible = false
      this.showUpdateFormVisible = false
      this.showGroupInfoVisible = false
      this.showInfoVisible = false
    },
    
    updateActiveHotspotPosition(data) {
      this.activeHotspot = Object.assign({}, this.activeHotspot, {'atv':data.atv, 'ath':data.ath})
    },
    updateHotspotByActiveHotspot() {
      this.hotspot = Object.assign({}, this.hotspot, {[this.activeHotspot.hash_id]: this.activeHotspot})
    },

    updateWork() {
      let data = {
        id: this.work.hash_id,
        option: JSON.stringify(JSON.parse(jsonStringify({
          scene: this.scene,
          sceneGroup: this.sceneGroup,
          hotspot: this.hotspot,
          hotspotGroup: this.hotspotGroup,
          view: this.view,
          viewGroup: this.viewGroup
        })))
      }
      appStore.loading();
      http()
        .put(api.host + api.panoramaWork + this.work.hash_id, data)
        .then((res) => {
          appStore.ready();
        })
    },
    getPanorama(id) {
      appStore.loading();
      let that = this
      http()
        .get(api.host + api.panoramaWork + id)
        .then((res) => {
          let respond = res.data;
          if (respond.code == 200) {
            this.work = respond.data;
            this.initWork()
            if (respond.data.option) {
              let option = JSON.parse(this.work.option)
              for (let key in option) {
                this[key] = option[key]
              }
            }
          }
          appStore.ready();
        });
    },

    initWork(){

    },

    addScene(sceneList) {
      
      for (let sceneHashId in sceneList) {
        // 这里如果某个场景已经存在, 并且场景包含分组信息
        if(this.scene[sceneHashId] && this.scene[sceneHashId].group_id){
            this.delSceneByGroup(this.scene[sceneHashId], this.scene[sceneHashId].group_id)
        }
        // 如果此场景有分组信息, 那么需要加入到分组信息里
        if(sceneList[sceneHashId].group_id){
          this.addSceneByGroup(sceneHashId, sceneList[sceneHashId].group_id)
        }
        this.scene = Object.assign({}, this.scene, sceneList);
      }
    },
    delSceneByGroup(hashId, groupId) {
      if (this.sceneGroup[groupId] && this.sceneGroup[groupId].scenes) {
          let index = this.sceneGroup[groupId].scenes.indexOf(hashId)
          this.sceneGroup[groupId].scenes.splice(index, 1)
      }
    },
    addSceneByGroup(sceneHashId, groupId){
      if(this.sceneGroup[groupId].scenes.includes(sceneHashId)) return
      this.sceneGroup[groupId].scenes.push(sceneHashId)
    },

    addSceneGroup(scene_group) {
      if(!scene_group.scenes) scene_group.scenes = []
      this.sceneGroup = Object.assign({}, this.sceneGroup, {[scene_group.hash_id]: scene_group})
    },
    updateScene(newData, oldData) {
      this.scene = Object.assign({}, this.scene, {[newData.hash_id]:newData})
      if (oldData.group_id) {
        this.delSceneByGroup(newData.hash_id, oldData.group_id)
      }
      if (newData.group_id) {
        this.addSceneByGroup(newData.hash_id, newData.group_id)
      }
    },
    delScene(hashId) {
      let scene = this.scene[hashId]
      if (scene.group_id) {
        this.delSceneByGroup(hashId, scene.group_id)
      }
      delete this.scene[hashId]
    },

    delSceneGroup(hash_id) {
      let scenes = this.sceneGroup[hash_id].scenes
      if (scenes) {
        for (let index in scenes) {
          this.delScene(scenes[index])
        }
      }
      delete this.sceneGroup[hash_id]
    },

    addView(view) {
      view.scene_id = this.activeScene.hash_id
      this.view = Object.assign({}, this.view, {[view.hash_id]: view})
      this.addViewByScene(view.hash_id, this.activeScene.hash_id)
      this.setActiveScene(this.scene[this.activeScene.hash_id])
      if (view.group_id) {
        this.addViewByGroup(view.hash_id, view.group_id)
      }
    },
    addViewByGroup(view_hash_id, group_id){
      if(this.viewGroup[group_id].views){
        this.viewGroup[group_id].views.push(view_hash_id)
      }else{
        this.viewGroup[group_id].views = [view_hash_id]
      }
    },
    addViewByScene(view_hash_id, scene_hash_id){
      if(this.scene[scene_hash_id].views){
        if(this.scene[scene_hash_id].views.includes(view_hash_id)) return
        this.scene[scene_hash_id].views.push(view_hash_id)
      }else{
        this.scene[scene_hash_id].views = [view_hash_id]
      }
    },
    delViewByGroup(view_hash_id, group_hash_id){
      if (this.viewGroup[group_hash_id] && this.viewGroup[group_hash_id].views) {
          let index = this.viewGroup[group_hash_id].views.indexOf(view_hash_id)
          this.viewGroup[group_hash_id].views.splice(index, 1)
      }
    },
    delViewGroupByScene(view_group_hash_id, scene_hash_id){
      if(this.scene[scene_hash_id] && this.scene[scene_hash_id].viewGroups){
        let index = this.scene[scene_hash_id].viewGroups.indexOf(view_group_hash_id)
        this.scene[scene_hash_id].viewGroups.splice(index, 1)
      }
    },
    delViewByScene(view_hash_id, scene_hash_id){
      if(this.scene[scene_hash_id] && this.scene[scene_hash_id].views){
        let index = this.scene[scene_hash_id].views.indexOf(view_hash_id)
        this.scene[scene_hash_id].views.splice(index, 1)
      }
    },
    updateView(newData, oldData) {
      this.view = Object.assign({}, this.view, {[newData.hash_id]:newData})
      if(oldData.group_id){
        this.delViewByGroup(newData.hash_id, oldData.group_id)
      }
      if (newData.group_id) {
        this.addViewByGroup(newData.hash_id, newData.group_id)
      }
    },
    addViewGroup(viewGroup) {
      viewGroup.scene_id = this.activeScene.hash_id
      viewGroup.views = []
      this.addViewGroupByScene(viewGroup.hash_id, this.activeScene.hash_id)
      this.setActiveScene(this.scene[this.activeScene.hash_id])
      this.viewGroup = Object.assign({}, this.viewGroup, {[viewGroup.hash_id]: viewGroup})
    },
    addViewGroupByScene(group_hash_id, scene_hash_id){
      if(this.scene[scene_hash_id].viewGroups){
        if(this.scene[scene_hash_id].viewGroups.includes(group_hash_id)) return
        this.scene[scene_hash_id].viewGroups.push(group_hash_id)
      }else{
        this.scene[scene_hash_id].viewGroups = [group_hash_id]
      }
    },

    delView(hash_id) {
      let view = this.view[hash_id]
      this.delViewByScene(hash_id, view.scene_id)
      if(view.group_id){
        this.delViewByGroup(hash_id, view.group_id)
      }
      delete this.view[hash_id]
    },
    delViewGroup(hash_id) {
      this.delViewGroupByScene(hash_id, this.viewGroup[hash_id].scene_id)
      delete this.viewGroup[hash_id]
    },

    addHotspot(hotspot) {
      hotspot.scene_id = this.activeScene.hash_id
      this.hotspot = Object.assign({}, this.hotspot, {[hotspot.hash_id]:hotspot})
      this.addHotspotByScene(hotspot.hash_id, this.activeScene.hash_id)
      this.setActiveScene(this.scene[this.activeScene.hash_id])
      if(hotspot.group_id){
        this.addHotspotByGroup(hotspot.hash_id, hotspot.group_id)
      }
    },
    updateHotspot(newData, oldData) {
      this.hotspot = Object.assign({}, this.hotspot, {[newData.hash_id]:newData})
      if (oldData.group_id){
          this.delHotspotByGroup(oldData.hash_id, oldData.group_id)
      }
      if(newData.group_id){
        this.addHotspotByGroup(newData.hash_id, newData.group_id)
      }
    },
    addHotspotGroup(hotspotGroup) {
      hotspotGroup.scene_id = this.activeScene.hash_id
      hotspotGroup.hotspots = []
      this.addHotspotGroupByScene(hotspotGroup.hash_id, this.activeScene.hash_id)
      this.setActiveScene(this.scene[this.activeScene.hash_id])
      this.hotspotGroup = Object.assign({}, this.hotspotGroup, {[hotspotGroup.hash_id]:hotspotGroup})
    },
    addHotspotByGroup(hotspot_hash_id, group_hash_id){
      if(this.hotspotGroup[group_hash_id].hotspots){
        if(this.hotspotGroup[group_hash_id].hotspots.includes(hotspot_hash_id)) return
        this.hotspotGroup[group_hash_id].hotspots.push(hotspot_hash_id)
      }else{
        this.hotspotGroup[group_hash_id].hotspots = [hotspot_hash_id]
      }
    },
    addHotspotByScene(hotspot_hash_id, scene_hash_id){
        if(this.scene[scene_hash_id].hotspots){
          if(this.scene[scene_hash_id].hotspots.includes(hotspot_hash_id)) return
          this.scene[scene_hash_id].hotspots.push(hotspot_hash_id)
        }else{
          this.scene[scene_hash_id].hotspots = [hotspot_hash_id]
        }
    },
    addHotspotGroupByScene(group_hash_id, scene_hash_id){
      if(this.scene[scene_hash_id].hotspotGroups){
        if(this.scene[scene_hash_id].hotspotGroups.includes(group_hash_id)) return
        this.scene[scene_hash_id].hotspotGroups.push(group_hash_id)
      }else{
        this.scene[scene_hash_id].hotspotGroups = [group_hash_id]
      }
    },

    delHotspot(hash_id) {
      let hotspot = this.hotspot[hash_id]
      this.delHotspotByScene(hotspot.hash_id, hotspot.scene_id)
      if(hotspot.group_id){
        this.delHotspotByGroup(hotspot.hash_id, hotspot.group_id)
      }
      delete this.hotspot[hash_id]
    },
    delHotspotGroup(hash_id) {
      let hotspotGroup = this.hotspotGroup[hash_id]
      this.delHotspotGroupByScene(hash_id, hotspotGroup.scene_id)
      delete this.hotspotGroup[hash_id]
    },
    delHotspotByGroup(hotspot_id, group_id){
      if(this.hotspotGroup[group_id] && this.hotspotGroup[group_id].hotspots){
        let index = this.hotspotGroup[group_id].hotspots.indexOf(hotspot_id)
        this.hotspotGroup[group_id].hotspots.splice(index, 1)
      } 
    },
    delHotspotByScene(hotspot_id, scene_hash_id){
      if(this.scene[scene_hash_id] && this.scene[scene_hash_id].hotspots){
        let index = this.scene[scene_hash_id].hotspots.indexOf(hotspot_id)
        this.scene[scene_hash_id].hotspots.splice(index, 1)
      } 
    },
    delHotspotGroupByScene(hotspot_group_id, scene_hash_id){
      if(this.scene[scene_hash_id] && this.scene[scene_hash_id].hotspotGroups){
        let index = this.scene[scene_hash_id].hotspotGroups.indexOf(hotspot_group_id)
        this.scene[scene_hash_id].hotspotGroups.splice(index, 1)
      } 
    },

    setActiveSceneGroup(activeSceneGroup) {
      this.activeSceneGroup = activeSceneGroup
    },
    setActiveScene(activeScene) {
      this.activeScene = activeScene
    },
    setActiveHotspot(activeHotspot) {
      this.activeHotspot = activeHotspot
    },
    setActiveHotspotGroup(activeHotspotGroup) {
      this.activeHotspotGroup = activeHotspotGroup
    },
    setActiveLayer(activeLayer) {
      this.activeLayer = activeLayer
    },
    setActiveLayerGroup(activeLayerGroup) {
      this.activeLayerGroup = activeLayerGroup
    },
    setActiveLogic(activeLogic) {
      this.activeLogic = activeLogic
    },
    setActiveLogicGroup(activeLogicGroup) {
      this.activeLogicGroup = activeLogicGroup
    },
    setActiveView(activeView) {
      this.activeView = activeView
    },
    setActiveViewGroup(activeViewGroup) {
      this.activeViewGroup = activeViewGroup
    },

    toggleDashboard() {
      this.showDashboardVisible = !this.showDashboardVisible
    },
    toggleInfo() {
      this.showInfoVisible = !this.showInfoVisible
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