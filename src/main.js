import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import elementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 阿里图标
import '@/assets/icons/font/iconfont.css'
import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

// echarts 
import echarts from "echarts";

Vue.prototype.$echarts = echarts;



Vue.use(elementUi)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
