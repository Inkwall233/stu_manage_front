<template>
  <div class="main" :style="{ backgroundImg: 'url(' + url + ')' }">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <div
      class="container"
      :class="{ sidebarclose: $store.state.sideBarIsOpen }"
    >
      <Breadcrumb></Breadcrumb>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Breadcrumb from "./breadcrumb/Breadcrumb";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    Breadcrumb,
  },
  data() {
    return {
      url: "../../assets/images/main_bg.jpg",
    };
  },
  created() {},
  computed: {
    changebg() {
      if (this.$route.meta.bgimgurl) {
        console.log("11111");
        return this.$route.meta.bgimgurl;
      } else {
        return `url(~@/assets/images/main_bg.jpg)`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
}

.container {
  box-sizing: border-box;
  margin-left: 210px;
  transition: margin-left 0.5s;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.sidebarclose {
  transition: margin-left 0.5s;
  margin-left: 54px;
}
</style>