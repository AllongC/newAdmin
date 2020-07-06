<template>
  <el-container class="container">
    <el-aside width="200px">
      <h5>黑马头条</h5>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/post" @click="nextStation('/post')">
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="/publish" @click="nextStation('/publish')">
          <span slot="title">文章发布</span>
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
      <el-main>
        <breadcrumb />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import breadcrumb from "@/components/breadcrumb";
export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    nextStation(station) {
      if (this.$route.path !== station) {
        this.$router.push(station);
      }
    }
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