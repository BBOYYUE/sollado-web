import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      isLoading: false,
    };
  },
  actions: {
    loading () {
      this.isLoading = true;
    },
    ready () {
      this.isLoading = false;
    },
  },
});
