<template>
  <!-- 判断是否为路由hidden -->
  <fragment v-if="!item.hidden">
    <!-- 判断是否有子路由 -->
    <el-submenu v-if="item.children" :index="item.path">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <div v-if="item.children">
        
          <el-menu-item
            v-for="routeChild in item.children"
            :key="routeChild.path"
            :index="routeChild.path"
            @click="selectmenu(routeChild)"
          >
            <i :class="routeChild.meta.icon"></i>
            <span >{{ routeChild.meta.title }}</span>
          </el-menu-item>
        
      </div>
    </el-submenu>
    <!-- 没有子路由 -->
    <el-menu-item v-else :index="item.path">
      <i class="el-icon-menu"></i>
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>
  </fragment>
</template>

<script>
export default {
  name: "SidebarItem",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    routindex: {
      type: Number,
    },
  },

  mounted() {},

  methods: {
    selectmenu(item){
      // console.log(item);
      let tag = {}
      tag['name'] = item.name
      tag['path'] = item.path
      tag['label'] = item.meta.title
      this.$store.commit('selectmenu',tag)
    }
  },
};
</script>
<style lang='scss' scoped>
.el-menu-item-group__title {
  padding: 0;
}
</style>