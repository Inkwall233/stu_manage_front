<template>
  <div>
    <Welcome></Welcome>
    <Stuoverview></Stuoverview>
    <Introduce></Introduce>
  </div>
</template>

<script>
import Introduce from './components/Homeintroduce.vue';
import Stuoverview from './components/Stuoverview'
import Welcome from './components/welcome.vue';
export default {
  name: "home",
  components: {
    Stuoverview,
    Welcome,
    Introduce
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
<style lang='scss' scoped>

</style>
