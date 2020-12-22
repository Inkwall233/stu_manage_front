import Vue from "vue";
import Vuex from "vuex";

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
  },
  actions: {},
  modules: {},
});
