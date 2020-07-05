<template>
  <el-container class="container">
    <el-aside width="200px">
      <h5>黑马头条</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <img v-if="user.head_img" :src="$axios.defaults.baseURL+user.head_img" alt />
        <img v-else src="@/assets/logo.jpg" alt />
        <p>{{user.nickname}}</p>
        <button>退出</button>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    const userInfo = localStorage.getItem("user");
    this.user = JSON.parse(userInfo);
  }
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  p {
    margin: 0 10px;
  }
  button {
    margin: 0 10px;
    border: none;
    padding: 4px 10px;
    border-radius: 10px;
  }
}
.el-header,
.el-footer {
  background-color: #333;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>