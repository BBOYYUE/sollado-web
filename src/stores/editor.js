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
      work: {
        scenes: [],
        sceneGroups: []
      },
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
      buttonGroup: {}
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
      // 如果当前的 acitveSceneGroup 的 scene list 为空, 那么就需要初始化, 以免报错
      if (!this.sceneGroup[this.activeSceneGroup.hash_id].scenes) {
        this.sceneGroup[this.activeSceneGroup.hash_id].scenes = []
      }
      // 将新增的场景 hash_id 加入当前选中的场景分组, 并且更新到 activeSceneGroup 对象. 
      this.sceneGroup[this.activeSceneGroup.hash_id].scenes.push(Object.keys(scene))
      this.activeSceneGroup = this.sceneGroup[this.activeSceneGroup.hash_id]

      // 如果当前作品的 scenes list 也为空, 那么也需要出事话, 然后加入
      if (!this.work.scenes) {
        this.work.scenes = []
      }
      this.work.scenes.push(Object.keys(scene))

      // 最后加入到 scene 中
      this.scene = Object.assign({}, this.scene, scene);
    },
    addSceneGroup (scene_group) {
      this.sceneGroup[scene_group.hash_id] = Object.assign({}, scene_group, {
        scenes: []
      });
      if (!this.work.sceneGroups) {
        this.work.sceneGroups = []
      }
      this.work.sceneGroups.push(scene_group.hash_id)
    },

    setActiveHotspot (activeHotspot) {
      this.activeHotspot = activeHotspot
    },
    setActiveHotspotGroup (activeHotspotGroup) {
      this.activeHotspotGroup = activeHotspotGroup
    },
    addHotspot (hotspot) {

    },
    addHotspotGroup (hotspotGroup) {

    }

  }
});