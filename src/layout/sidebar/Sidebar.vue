<template>
  <div class="sidebar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router="true"
      text-color="#000000"
      active-text-color="#0c8918"
    >
      <SidebarItem
        v-for="(route, routindex) in routes"
        :key="route.path"
        :item="route"
        :routindex="routindex"
      ></SidebarItem>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem.vue";
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  watch: {},
  components: {
    SidebarItem,
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    isCollapse() {
      return this.$store.state.sideBarIsOpen;
    },
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 210px !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  opacity: 0.8;
}
.el-menu-vertical-demo {
  width: 210px !important;
}
.el-menu--collapse {
  width: 54px !important;
}
</style>
