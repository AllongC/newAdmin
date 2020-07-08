<template>
  <div class="breadcrumb">
    <span v-for="(item,index) in $route.matched" :key="index">
      {{item.meta.name}}
      <span v-if="index!==$route.matched.length-1">/</span>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.breadcrumb {
  margin: 0px 0px 30px 0px;
}
</style>