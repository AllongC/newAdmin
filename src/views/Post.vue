<template>
  <div>
    <div class="page">
      <el-pagination
        background
        layout="sizes,prev, pager, next,total,jumper"
        :page-sizes="[2,4,6,8]"
        :page-size="pageSize"
        :total="total"
        :current-page="pageIndex"
        @size-change="changeSize"
        @current-change="changePage"
      ></el-pagination>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="序列号" width="80" align="center">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column label="日期" width="150" align="center">
        <template slot-scope="scope">{{scope.row.create_date.split("T")[0]}}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column label="封面" align="center" width="210px">
        <template slot-scope="scope">
          <img :src="scope.row.cover[0].url" alt />
        </template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="sizes,prev, pager, next,total,jumper"
        :page-sizes="[2,4,6,8]"
        :page-size="pageSize"
        :total="total"
        :current-page="pageIndex"
        @size-change="changeSize"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 2,
      total: 0
    };
  },
  methods: {
    load() {
      this.$axios({
        url: "/post",
        method: "get",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        const { data, total } = res.data;
        this.tableData = data;
        this.total = total;
      });
    },
    changePage(index) {
      this.pageIndex = index;
      this.load();
    },
    changeSize(size) {
      this.pageSize = size;
      this.load();
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.page {
  margin: 20px 0px;
  text-align: center;
}
</style>