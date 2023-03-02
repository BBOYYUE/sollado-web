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

    updateActiveHotspot(data) {
      let { atv, ath } = data
      this.activeHotspot.ath = ath
      this.activeHotspot.atv = atv
      console.log(this.activeHotspot);
    },
    updateHotspotByActiveHotspot() {
      console.log(this.activeHotspot.hash_id, 1111)
      this.hotspot[this.activeHotspot.hash_id] = this.activeHotspot
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
    setActiveSceneGroup(activeSceneGroup) {
      console.log(activeSceneGroup)
      this.activeSceneGroup = activeSceneGroup
    },
    setActiveScene(activeScene) {
      this.activeScene = activeScene
    },
    addScene(scene) {
      // 这里如果某个场景已经存在了, 并且在某个场景分组中, 那么会删了重加
      for (let sceneHashId in scene) {
        if (this.scene[sceneHashId] && this.scene[sceneHashId].group_id && scene[sceneHashId].group_id) {
          this.delSceneByGroup(this.scene[sceneHashId], this.scene[sceneHashId].group_id)
          if (!this.sceneGroup[scene[sceneHashId].group_id].scenes) {
            this.sceneGroup[scene[sceneHashId].group_id].scenes = []
          }
          this.sceneGroup[scene[sceneHashId].group_id].scenes.push(sceneHashId)
        }
      }

      this.scene = Object.assign({}, this.scene, scene);
    },
    addSceneGroup(scene_group) {
      this.sceneGroup[scene_group.hash_id] = Object.assign({}, scene_group, {
        scenes: new Set()
      });
    },
    updateScene(newData, oldData) {
      this.scene[newData.hash_id] = newData

      if (oldData.group_id) {
        if (Array.isArray(this.sceneGroup[oldData.group_id].scenes)) {
          let index = this.sceneGroup[oldData.group_id].scenes.indexOf(oldData.hash_id)
          this.sceneGroup[oldData.group_id].scenes.splice(index, 1)
        } else if (this.sceneGroup[oldData.group_id].scenes instanceof Set) {
          this.sceneGroup[oldData.group_id].scenes.delete(oldData.hash_id)
        }
      }
      if (newData.group_id) {
        if (this.sceneGroup[newData.group_id].scenes) {
          if (Array.isArray(this.sceneGroup[newData.group_id].scenes)) {
            this.sceneGroup[newData.group_id].scenes.push(newData.hash_id)
          } else if (this.sceneGroup[newData.group_id].scenes instanceof Set) {
            this.sceneGroup[newData.group_id].scenes.add(newData.hash_id)
          }
        } else {
          this.sceneGroup[newData.group_id].scenes = [newData.hash_id]
        }
      }
    },
    delScene(hashId) {
      let scene = this.scene[hashId]
      if (scene.group_id) {
        this.delSceneByGroup(hashId, scene.group_id)
      }
      delete this.scene[hashId]
    },
    delSceneByGroup(hashId, groupId) {
      if (this.sceneGroup[groupId] && this.sceneGroup[groupId].scenes) {
        if (Array.isArray(this.sceneGroup[groupId].scenes)) {
          let index = this.sceneGroup[groupId].scenes.indexOf(hashId)
          this.sceneGroup[groupId].scenes.splice(index, 1)
        } else if (this.sceneGroup[groupId].scenes instanceof Set) {
          this.sceneGroup[groupId].scenes.delete(hashId)
        }
      }
    },
    delSceneGroup(hash_id) {
      let scenes = this.sceneGroup[hash_id].scenes
      if (scenes) {
        for (let index in scenes) {
          delete this.scene[scenes[index]]
        }
      }
      delete this.sceneGroup[hash_id]
    },

    addView(view) {
      view.scene_id = this.activeScene.hash_id
      this.view[view.hash_id] = view;
      if (!this.activeScene.views) this.activeScene.views = new Set()
      if (this.activeScene.views instanceof Set) {
        this.activeScene.views.add(view.hash_id)
      } else {
        this.activeScene.views.push(view.hash_id)
      }
      this.scene[this.activeScene.hash_id] = this.activeScene
      if (view.group_id) this.viewGroup[view.group_id].views.add(view.hash_id)
    },
    updateView(newData, oldData) {
      this.view[newData.hash_id] = newData
      if (oldData.group_id && this.viewGroup[oldData.group_id] && this.viewGroup[oldData.group_id].views) {
        if (Array.isArray(this.viewGroup[oldData.group_id].views)) {
          let index = this.viewGroup[oldData.group_id].views.indexOf(oldData.hash_id)
          this.viewGroup[oldData.group_id].views.splice(index, 1)
        } else if (this.viewGroup[oldData.group_id].views instanceof Set) {
          this.viewGroup[oldData.group_id].views.delete(newData.hash_id)
        }
      }
      if (newData.group_id) {
        if (this.viewGroup[newData.group_id].views) {
          if (Array.isArray(this.viewGroup[newData.group_id].views)) {
            this.viewGroup[newData.group_id].views.push(newData.hash_id)
          } else if (this.viewGroup[newData.group_id].views instanceof Set) {
            this.viewGroup[newData.group_id].views.add(newData.hash_id)
          }
        } else {
          this.viewGroup[newData.group_id].views = [newData.hash_id]
        }
      }
    },
    addViewGroup(viewGroup) {
      viewGroup.scene_id = this.activeScene.hash_id
      if (!this.activeScene.viewGroups) this.activeScene.viewGroups = new Set()
      if (this.activeScene.viewGroups instanceof Set) {
        this.activeScene.viewGroups.add(viewGroup.hash_id)
      } else if (Array.isArray(this.activeScene.viewGroups)) {
        this.activeScene.viewGroups.push(viewGroup.hash_id)
      }
      this.scene[this.activeScene.hash_id] = this.activeScene
      this.viewGroup[viewGroup.hash_id] = Object.assign({}, viewGroup, {
        views: new Set()
      })
    },
    delView(hash_id) {
      let view = this.view[hash_id]
      if (view.scene_id && this.scene[view.scene_id] && this.scene[view.scene_id].views) {
        if (Array.isArray(this.scene[view.scene_id].views)) {
          let index = this.scene[view.scene_id].views.indexOf(hash_id)
          this.scene[view.scene_id].views.splice(index, 1)
        } else if (this.scene[view.scene_id].views instanceof Set) {
          this.scene[view.scene_id].views.delete(hash_id)
        }
        delete this.scene[view.scene_id].defaultView
      }
      if (view.group_id && this.viewGroup[view.group_id] && this.viewGroup[view.group_id].views) {
        if (Array.isArray(this.viewGroup[view.group_id].views)) {
          let index = this.viewGroup[view.group_id].views.indexOf(hash_id)
          this.viewGroup[view.group_id].views.splice(index, 1)
        } else if (this.viewGroup[view.group_id].views instanceof Set) {
          this.viewGroup[view.group_id].views.delete(hash_id)
        }
      }
      delete this.view[hash_id]
    },
    delViewGroup(hash_id) {
      delete this.viewGroup[hash_id]
    },

    setActiveHotspot(activeHotspot) {
      console.log(activeHotspot)
      this.activeHotspot = activeHotspot
    },
    setActiveHotspotGroup(activeHotspotGroup) {
      this.activeHotspotGroup = activeHotspotGroup
    },
    addHotspot(hotspot) {
      hotspot.scene_id = this.activeScene.hash_id
      this.hotspot[hotspot.hash_id] = hotspot;
      if (!this.activeScene.hotspots) this.activeScene.hotspots = new Set()
      if (this.activeScene.hotspots instanceof Set) {
        this.activeScene.hotspots.add(hotspot.hash_id)
      } else if (Array.isArray(this.activeScene.hotspots)) {
        this.activeScene.hotspots.push(hotspot.hash_id)
      }
      this.scene[this.activeScene.hash_id] = this.activeScene
      if (hotspot.group_id) {
        if (this.hotspotGroup[hotspot.group_id].hotspots) {
          if (Array.isArray(this.hotspotGroup[hotspot.group_id].hotspots)) {
            this.hotspotGroup[hotspot.group_id].hotspots.push(hotspot.hash_id)
          } else if (this.hotspotGroup[hotspot.group_id].hotspots instanceof Set) {
            this.hotspotGroup[hotspot.group_id].hotspots.add(hotspot.hash_id)
          }
        }else{
          this.hotspotGroup[hotspot.group_id].hotspots = [hotspot.hash_id]
        }
      }
    },
    updateHotspot(newData, oldData) {
      this.hotspot[newData.hash_id] = newData
      if (oldData.group_id && this.hotspotGroup[oldData.group_id] && this.hotspotGroup[oldData.group_id].hotspots) {
        if (Array.isArray(this.hotspotGroup[oldData.group_id].hotspots)) {
          let index = this.hotspotGroup[oldData.group_id].hotspots.indexOf(oldData.group_id)
          this.hotspotGroup[oldData.group_id].hotspots.splice(index, 1)
        } else if (this.hotspotGroup[oldData.group_id].hotspots instanceof Set) {
          this.hotspotGroup[oldData.group_id].hotspots.delete(newData.hash_id)
        }
      }
      if (newData.group_id) {
        if (this.hotspotGroup[newData.group_id]) {
          if (Array.isArray(this.hotspotGroup[newData.group_id].hotspots)) {
            this.hotspotGroup[newData.group_id].hotspots.push(newData.hash_id)
          } else if (this.hotspotGroup[newData.group_id].hotspots instanceof Set) {
            this.hotspotGroup[newData.group_id].hotspots.add(newData.hash_id)
          }
        } else {
          this.hotspotGroup[newData.group_id].hotspots = [newData.hash_id]
        }
      }
    },
    addHotspotGroup(hotspotGroup) {
      hotspotGroup.scene_id = this.activeScene.hash_id
      if (!this.activeScene.hotspotGroups) this.activeScene.hotspotGroups = new Set()
      if(this.activeScene.hotspotGroups instanceof Set){
        this.activeScene.hotspotGroups.add(hotspotGroup.hash_id)
      }else if(Array.isArray(this.activeScene.hotspotGroups)){
        this.activeScene.hotspotGroups.push(hotspotGroup.hash_id)
      }
      this.scene[this.activeScene.hash_id] = this.activeScene
      this.hotspotGroup[hotspotGroup.hash_id] = Object.assign({}, hotspotGroup, {
        hotspots: new Set()
      })
    },
    delHotspot(hash_id) {
      let hotspot = this.hotspot[hash_id]
      if (hotspot.scene_id && this.scene[hotspot.scene_id] && this.scene[hotspot.scene_id].hotspots) {
        if (Array.isArray(this.scene[hotspot.scene_id].hotspots)) {
          let index = this.scene[hotspot.scene_id].hotspots.indexOf(hash_id)
          this.scene[hotspot.scene_id].hotspots.splice(index, 1)
        } else if (this.scene[hotspot.scene_id].hotspots instanceof Set) {
          this.scene[hotspot.scene_id].hotspots.delete(hash_id)
        }
      }
      if (hotspot.group_id && this.hotspotGroup[hotspot.group_id] && this.hotspotGroup[hotspot.group_id].hotspots) {
        if (Array.isArray(this.hotspotGroup[hotspot.group_id].hotspots)) {
          let index = this.hotspotGroup[hotspot.group_id].hotspots.indexOf(hash_id)
          this.hotspotGroup[hotspot.group_id].hotspots.splice(index, 1)
        } else if (this.hotspotGroup[hotspot.group_id].hotspots instanceof Set) {
          this.hotspotGroup[hotspot.group_id].hotspots.delete(hash_id)
        }
      }
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
      if (oldData.group_id && this.layerGroup[oldData.group_id] && this.layerGroup[oldData.group_id].layers) {
        if (Array.isArray(this.layerGroup[oldData.group_id].layers)) {
          let index = this.layerGroup[oldData.group_id].layers.indexOf(oldData.group_id)
          this.layerGroup[oldData.group_id].layers.splice(index, 1)
        } else if (this.layerGroup[oldData.group_id].layers instanceof Set) {
          this.layerGroup[oldData.group_id].layers.delete(oldData.group_id)
        }
      }
      if (newData.group_id) {
        if (this.layerGroup[newData.group_id].layers) {
          if (Array.isArray(this.layerGroup[newData.group_id].layers)) {
            this.layerGroup[newData.group_id].layers.push(newData.hash_id)
          } else if (this.layerGroup[newData.group_id].layers instanceof Set) {
            this.layerGroup[newData.group_id].layers.add(newData.hash_id)
          }
        } else {
          this.layerGroup[newData.group_id].layers = [newData.hash_id]
        }
      }
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