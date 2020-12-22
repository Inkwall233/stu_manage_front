<template>
  <div class="tabs">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!-- tag标签 -->
    <el-tag
      v-for="(tag,index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :type="$route.name === tag.name ? 'success' : 'info'"
      @click="changemenu(tag)"
      @close="handleClose(tag,index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Breadcrumb",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tagslist,
    }),
  },
  mounted() {
    // console.log(this.$route);
  },

  methods: {
    ...mapMutations({
      close: 'closeTab'
    }),
    handleClose(tag,index){
      // console.log(tag);
      // vuex 删除
      this.close(tag)
      let length = this.tags.length
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (tag.name !== this.$route.name) {
        return
      }
      console.log(index);
      console.log(length);
      // 如果关闭的是最右边路由
      if (index === length) {
        
        this.$router.push({ name: this.tags[index - 1].name })
      } else {
        // 否则往右边跳转
        this.$router.push({ name: this.tags[index].name })
      }
      
    },
    changemenu(item) {
      if(this.$route.name === item.name) {
        return
      }
      this.$router.push({ name: item.name });
    },
  },
};
</script>
<style lang='scss' scoped>
.tabs {
  margin-top: 10px;
  margin-left: 15px;
}
.el-tag {
  cursor: pointer;
}
.el-tag {
  margin-right: 10px;
}
</style>