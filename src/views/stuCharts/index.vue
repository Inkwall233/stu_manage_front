<template>
  <div>
    <el-row :gutter="20" class="echarts-wrap">
      <el-col :span="12" class="">
        <Emap></Emap>
        <Ereward></Ereward>
      </el-col>
      <el-col :span="12">
        <Epie></Epie>
        <Echange></Echange>
      </el-col>
      <el-col :span="24">
        <Egrade></Egrade>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Echange from './components/Echange.vue';
import Egrade from './components/Egrade.vue';
import Emap from "./components/Emap";
import Epie from "./components/Epie.vue";
import Ereward from './components/Ereward.vue';
export default {
  name: "stucharts",
  components: {
    Emap,
    Epie,
    Ereward,
    Echange,
    Egrade,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
<style lang='scss' scoped>
.echarts-wrap {
  margin-left: 5px!important;
  margin-right: 5px!important;
  margin-top: 15px;
}
</style>