<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item class="title">
          <h2>登录</h2>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (!this.form.username || !this.form.password) {
        this.$message.error("请输入完整的信息!");
        return;
      }
      this.$axios({
        url: "/login",
        method: "post",
        data: this.form
      }).then(res => {
        const { message, data } = res.data;
        if (message === "登录成功") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-row {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .title {
    margin-bottom: 50px;
  }
  h2 {
    text-align: center;
  }
  .el-input {
    width: 400px;
    height: 40px;
  }
}
</style>