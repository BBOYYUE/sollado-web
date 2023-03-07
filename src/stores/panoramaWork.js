import { defineStore } from "pinia";
import http from "@/util/http";
import * as api from "../util/api";
import queryBuilder from "../util/queryBuilder";
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();

/**
 * 全景作品管理器
 */

export const usePanoramaWorkStore = defineStore("panoramaWork", {
  state: () => {
    return {
      active: {},
      assets: {},
      history: [],
      workingList: new Set(),
      queryBuilder: {
        filter: {
          id: undefined,
          type: undefined,
          parent_id: undefined,
          name: undefined,
        },
        sort: {
          updated_at: -1,
        },
        page: 1,
      },
    };
  },
  actions: {
    getAsset() {
      this.queryBuilder.filter.parent_id = undefined;
      this.queryBuilder.filter.name = undefined;
      appStore.loading();
      http()
        .get(api.host + api.panoramaWork + queryBuilder(this.queryBuilder))
        .then((res) => {
          let respond = res.data;
          if (respond.code == 200) {
            this.assets = respond.data;
          }
          appStore.ready();
        });
    },
    getFolder() {
      this.queryBuilder.filter.parent_id = this.active.hashId;
      appStore.loading();
      http()
        .get(api.host + api.panoramaWork + queryBuilder(this.queryBuilder))
        .then((res) => {
          let respond = res.data;
          if (respond.code == 200) {
            this.folder = respond.data;
          }
          appStore.ready();
        });
    },
    setFilterByName(name) {
      this.queryBuilder.filter.name = name;
    },
    setActive(active) {
      let hashIdList = [];
      this.history.map((history) => {
        hashIdList.push(history.hashId);
      });
      let HashIdSet = new Set(hashIdList);
      if (this.history.length == 0 || !HashIdSet.has(active.hashId)) {
        this.history.push(active);
      }
      this.active = active;
    },
    setPage(page) {
      this.queryBuilder.page = page;
    },
    storeAsset(form) {
      appStore.loading();
      http()
        .post(api.host + api.panoramaWork, form)
        .then((res) => {
          let respond = res.data;
          if (respond.code == 200) {
            this.assets.data.unshift(respond.data);
          }
          appStore.ready();
        });
    },
    addWorkingList(id) {
      this.workingList.add(id);
    },
    delWorkingList(id) {
      this.workingList.delete(id);
    },
    storePanoramaWork(form) {
      appStore.loading();
      http()
        .post(api.host + api.panoramaWork, form)
        .then((res) => {
          let respond = res.data;
          let that = this;
          if (respond.code == 200) {
            if (respond.data instanceof Array) {
              respond.data.map((arr) => {
                that.folder.data.unshift(arr);
                this.workingList.add(arr.hash_id);
              });
            } else {
              this.folder.data.unshift(respond.data);
              this.workingList.add(respond.data.hash_id);
            }
          }
          appStore.ready();
        });
    },
    async deletePanoramaWork(id) {
      appStore.loading();
      await http()
        .delete(api.host + api.panoramaWork + id)
      this.getAsset()

    },
  },
});
