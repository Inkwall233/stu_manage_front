import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;

import elementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import { getToken } from "@/utils/auth.js";

// 阿里图标
import "@/assets/icons/font/iconfont.css";
import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

// echarts
import echarts from "echarts";

Vue.prototype.$echarts = echarts;

//路由守卫
const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach((to, from, next) => {
  const hasToken = getToken();
  // console.log(to);
  // console.log(from);
  if (hasToken) {
    // 有token
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.state.username
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          store.dispatch('getInfo1')

          next()
        } catch (error) {
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
    }
  }
});


Vue.use(elementUi);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

