<template>
  <div class="main" ref="main" :style="{ backgroundImg: 'url(' + url + ')' }">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <div id="bg" class="bg"></div>
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
  created() {
    if (this.$route.path === "/home") {
      document
        .querySelector("body")
        .setAttribute(
          "style",
          `background-image: url('https://cdn.jsdelivr.net/gh/inkwall233/imgcdn/bg-1.jpg')`
        );
    } else if (this.$route.path === "/admin") {
      document
        .querySelector("body")
        .setAttribute(
          "style",
          `background-image: url('https://cdn.jsdelivr.net/gh/inkwall233/imgcdn/bg4.webp')`
        );
    } else {
      document
        .querySelector("body")
        .setAttribute(
          "style",
          `background-image: url(' https://cdn.jsdelivr.net/gh/inkwall233/imgcdn/bg-3.webp')`
        );
    }
  },
  computed: {},
  watch: {
    $route(to, from) {
      console.log(this.$route);
      console.log(this);
      if (this.$route.path === "/home") {
        document
          .querySelector("body")
          .setAttribute(
            "style",
            `background-image: url('https://cdn.jsdelivr.net/gh/inkwall233/imgcdn/bg-1.jpg')`
          );
      } else if (this.$route.path === "/admin") {
        document
          .querySelector("body")
          .setAttribute(
            "style",
            `background-image: url('https://cdn.jsdelivr.net/gh/inkwall233/imgcdn/bg4.webp')`
          );
      } else {
        document
          .querySelector("body")
          .setAttribute(
            "style",
            `background-image: url(' https://cdn.jsdelivr.net/gh/inkwall233/imgcdn/bg-3.webp')`
          );
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
#bg {
  // background-image: url('https://cdn.jsdelivr.net/gh/inkwall233/imgcdn/bg-1.jpg');
  background-size: cover;
  background-position: 100% 100%;
  background-repeat: no-repeat;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>