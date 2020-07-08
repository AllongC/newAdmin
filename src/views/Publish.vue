<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <VueEditor v-model="form.content" />
      </el-form-item>

      <el-form-item label="栏目">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="1">复选框 A</el-checkbox>
          <el-checkbox label="2">复选框 B</el-checkbox>
          <el-checkbox label="3">复选框 C</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          :action="$axios.defaults.baseURL +'/upload'"
          :headers="{Authorization: 'Bearer '+token}"
          list-type="picture-card"
          :on-success="success"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="1">文章</el-checkbox>
          <el-checkbox label="2">视频</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      checkList: [],
      form: {
        title: "",
        type: "",
        content: ""
      }
    };
  },
  methods: {
    success(res) {
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 450px;
}
</style>