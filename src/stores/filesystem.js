import { defineStore } from "pinia";
import http from "@/util/http";
import * as api from "../util/api";
import queryBuilder from "../util/queryBuilder";
import { useAppStore } from "@/stores/app";
import * as filesystemType from "@/common/filesystemType.js"

const appStore = useAppStore();

/**
 * 文件管理器的状态
 */

export const useFilesystemStore = defineStore("filesystem", {
  state: () => {
    return {
      active: {},
      storehouse: {},
      folder: {},
      history: [],
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
    clearHistory() {
      while (this.history.length > 0) {
        this.history.pop();
      }
      console.log(this.history);
    },
    getStorehouse() {
      appStore.loading();
      this.queryBuilder.filter.type = filesystemType.STOREHOUSE;
      this.queryBuilder.filter.parent_id = undefined;
      this.queryBuilder.filter.name = undefined;
      http()
        .get(api.host + api.filesystem + queryBuilder(this.queryBuilder))
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
        .get(api.host + api.filesystem + queryBuilder(this.queryBuilder))
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
    addFile(file) {
      this.folder.data.unshift(file);
    },
    storeFolder(form) {
      appStore.loading();
      http()
        .post(api.host + api.filesystem, form)
        .then((res) => {
          let respond = res.data;
          if (respond.code == 200) {
            this.folder.data.push(respond.data);
          }
          appStore.ready();
        });
    },
    async deleteFile(id) {
      appStore.loading();
      await http()
        .delete(
          api.host + api.filesystem + id
        )
      this.getFolder()
    },
    downloadFile(id) {
      window.open(api.host + api.filesystem + id);
    },
  },
});
