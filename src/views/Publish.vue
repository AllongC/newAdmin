<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <VueEditor :useCustomImageHandler="true" @image-added="imageUpload" v-model="form.content" />
      </el-form-item>

      <el-form-item label="栏目">
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="item in column" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          :action="$axios.defaults.baseURL +'/upload'"
          :headers="{Authorization: 'Bearer '+token}"
          list-type="picture-card"
          :on-success="successCover"
          :on-remove="removeCover"
          :file-list="form.cover"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendData">发布</el-button>
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
      column: [],
      form: {
        title: "",
        type: 1,
        content: "",
        cover: [],
        categories: []
      }
    };
  },
  mounted() {
    this.$axios({
      url: "/category",
      method: "get"
    }).then(res => {
      const { data } = res.data;
      this.column = data;
    });
    if (this.$route.query.id) {
      this.$axios({
        url: "/post/" + this.$route.query.id,
        method: "get"
      }).then(res => {
        const { data } = res.data;
        const newCover = data.cover.map(item => {
          const cover = { ...item };
          if (cover.url.indexOf("http") == -1) {
            cover.url = this.$axios.defaults.baseURL + cover.url;
          }
          return cover;
        });
        data.cover = newCover;
        this.checkList = data.categories.map(item => {
          return item.id;
        });
        data.content = data.content.replace(/div/g, "p");
        this.form = data;
      });
    }
  },
  watch: {
    checkList() {
      this.form.categories = this.checkList.map(item => {
        return {
          id: item
        };
      });
    }
  },
  methods: {
    successCover(res, file, fileList) {
      file.id = res.data.id;
      this.form.cover.push(file);
    },
    removeCover(file, fileList) {
      this.form.cover = fileList;
    },
    sendData() {
      this.$axios({
        url: "/post",
        method: "post",
        data: this.form
      }).then(res => {
        console.log(res);
      });
    },
    imageUpload(file, Editor, cursorLocation, resetUploader) {
      const data = new FormData();
      data.append("file", file);
      this.$axios({
        url: "/upload",
        method: "post",
        data
      }).then(res => {
        const { url } = res.data.data;
        Editor.insertEmbed(
          cursorLocation,
          "image",
          this.$axios.defaults.baseURL + url
        );
        resetUploader();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 450px;
}
</style>