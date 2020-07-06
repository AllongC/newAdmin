<template>
  <div>
    <span v-for="(item,index) in path" :key="index">
      {{item.meta.name}}
      <span v-if="index!==path.length-1">/</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: []
    };
  },
  mounted() {
    this.path = this.$route.matched;
  }
};
</script>

<style lang="less" scoped>
</style>