import { defineStore } from "pinia";
import axios from "axios";
import * as api from "../util/api";
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isAuth: false,
      user: {},
      accessToken: "",
      tokenType: "",
      expiresIn: 3600,
    };
  },
  actions: {
    login (form) {
      appStore.loading();
      axios.post(api.host + api.auth, form).then((res) => {
        let respond = res.data;
        if (respond.code == 200) {
          localStorage.setItem("accessToken", respond.data.access_token);
          localStorage.setItem("tokenType", respond.data.token_type);
          this.accessToken = respond.data.access_token;
          this.user = respond.data.user;
          this.tokenType = respond.data.token_type;
          this.expiresIn = respond.data.expires_in;
          this.isAuth = true;
        }
        appStore.ready();
      });
    },
    relogin (form) {
      let { accessToken, tokenType } = form;
      let instance = axios.create({
        timeout: 1000 * 12,
      });
      instance.interceptors.request.use((req) => {
        req.headers.Authorization = tokenType + " " + accessToken;
        return req;
      });
      appStore.loading();
      instance.put(api.host + api.auth + "update").then((res) => {
        let respond = res.data;
        if (respond.code == 200) {
          localStorage.setItem("accessToken", respond.data.access_token);
          localStorage.setItem("tokenType", respond.data.token_type);
          this.accessToken = respond.data.access_token;
          this.user = respond.data.user;
          this.tokenType = respond.data.token_type;
          this.expiresIn = respond.data.expires_in;
          this.isAuth = true;
        } else {
          localStorage.clear();
        }
        appStore.ready();
      });
    },
  },
});
