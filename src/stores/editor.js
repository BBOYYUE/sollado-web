import { defineStore } from "pinia";
import http from "@/util/http";
import * as api from "../util/api";
import queryBuilder from "../util/queryBuilder";
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();

export const useEditorStore = defineStore("editor", {
  state: () => {
    return {
      work: {
        scenes: [],
        sceneGroups: []
      },
      sceneGroup: {

      },
      scene: {},
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
    addScene (scene, group_hash_id) {
      if (this.sceneGroup[group_hash_id]) {
        this.sceneGroup[group_hash_id].scenes.push(scene.hash_id)
        this.work.scenes.push(scene.hash_id)
      }
      this.scene[scene.hash_id] = scene
    },
    addSceneGroup (sceneGroup) {
      this.sceneGroup[sceneGroup.hash_id] = Object.assign({}, sceneGroup, {
        scenes: []
      });
      this.work.sceneGroups.push(sceneGroup.hash_id)
    }
  }
});