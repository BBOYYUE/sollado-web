import { defineStore } from "pinia";
import http from "@/util/http";
import * as api from "../util/api";
import queryBuilder from "../util/queryBuilder";
import { useAppStore } from "@/stores/app";
import * as threeDimensionalType from "@/common/threeDimensionalType.js"
const appStore = useAppStore();

/**
 * 3D模型管理器
 */
export const useThreeDimensionalStore = defineStore("threeDimensional", {
  state: () => {
    return {
      active: {},
      storehouse: {},
      folder: {},
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
          type: -1,
          updated_at: -1,
        },
        page: 1,
      },
    };
  },
  actions: {
    getStorehouse() {
      this.queryBuilder.filter.type = threeDimensionalType.STOREHOUSE;
      this.queryBuilder.filter.parent_id = undefined;
      this.queryBuilder.filter.name = undefined;
      appStore.loading();
      http()
        .get(api.host + api.threeDimensional + queryBuilder(this.queryBuilder))
        .then((res) => {
          let respond = res.data;
          if (respond.code == 200) {
            this.storehouse = respond.data;
            this.queryBuilder.filter.type = undefined;
          }
          appStore.ready();
        });
    },
    getFolder() {
      this.queryBuilder.filter.parent_id = this.active.hashId;
      appStore.loading();
      http()
        .get(api.host + api.threeDimensional + queryBuilder(this.queryBuilder))
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
    storeFolder(form) {
      appStore.loading();
      http()
        .post(api.host + api.threeDimensional, form)
        .then((res) => {
          let respond = res.data;
          if (respond.code == 200) {
            this.folder.data.unshift(respond.data);
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
    storeThreeDimensional(form) {
      appStore.loading();
      http()
        .post(api.host + api.threeDimensional, form)
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
    deleteThreeDimensional(id) {
      appStore.loading();
      http()
        .delete(api.host + api.threeDimensional + id)
        .then(() => {
          appStore.ready();
        });
    },
  },
});
