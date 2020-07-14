<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row._id)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="goToEdit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    // this.getItems()
    this.fetch();
  },
  methods: {
    getItems() {
      this.$http.get("articles").then(res => {
        this.items = res.data;
      });
    },
    async fetch() {
      // alert(1)
      const res = await this.$http.get("articles");
      this.items = res.data;
    },
    handleClick(i) {
      console.log(i);
    },
    goToEdit(i) {
      console.log(i);
      this.$router.push(`/articles/edit/${i}`);
    },
    async remove(row) {
      console.log(row)
      this.$confirm(`是否确定删除文章${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`articles/${row._id}`)// eslint-disable-line no-unused-vars
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>