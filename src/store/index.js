import Vue from "vue";
import Vuex from "vuex";

import { setToken, getToken, removeToken } from "@/utils/auth.js";
import { getLogin, getInfo } from "@/api/request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 侧边栏开关
    sideBarIsOpen: false,
    // 路由标签
    currentMenu: null,
    tagslist: [
      {
        path: "/",
        name: "home",
        label: "主页",
      },
    ],

    isLogin: false,
    token: getToken(),
    username: "",
    avatar: "",
    position: "",
  },
  mutations: {
    changeSideBarIsOpen(state, isCollapse) {
      state.sideBarIsOpen = isCollapse;
    },
    selectmenu(state, val) {
      if (val.name === "home") {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        //如果等于-1说明tagslist不存在那么插入，否则什么都不做
        let result = state.tagslist.findIndex((item) => item.name === val.name);
        result === -1 ? state.tagslist.push(val) : "";
      }
    },
    closeTab(state, val) {
      let result = state.tagslist.findIndex((item) => item.name === val.name);
      state.tagslist.splice(result, 1);
    },

    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.username = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_POSITION: (state, position) => {
      state.position = position;
    },
  },
  actions: {
    // 登录
    login({ commit }, userPass) {
      const { username, pass } = userPass;
      return new Promise((resolve, reject) => {
        getLogin({ username: username, pass: pass })
          .then((res) => {
            const { data } = res;
            commit("SET_TOKEN", data.token);
            setToken(data.token);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getInfo1({ commit ,state}) {
      return new Promise((resolve, reject) => {
        getInfo({ token: state.token })
          .then((res) => {
            let { data } = res;
            commit("SET_NAME", data.nickname);
            commit("SET_AVATAR", data.avatar);
            commit("SET_POSITION", data.position);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout() {
      removeToken();
    },
  },
  modules: {},
});
