<template>
  <div class="welcome container_wrap">
    <span>现在是 {{ time }} ， 欢迎你！</span>
    <span class="wel-user">{{$store.state.username}}</span>
  </div>
</template>

<script>
export default {
  components: {},
  name: "Welcome",
  data() {
    return {
      time: null,
    };
  },

  mounted() {
    let timer = new Date();

    this.time = timer.toLocaleDateString();
  },

  methods: {},
};
</script>
<style lang='scss' scoped>
// .welcome {
// }
.wel-user {
  color: #fb7299;
}
</style>