<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <!-- <el-table-column prop="date" label="日期" width="140">
      </el-table-column>-->
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="parent.name" label="父级名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row._id)" type="text" size="small">查看</el-button>
          <!-- <el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button> -->
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
      this.$http.get("categories").then(res => {
        this.items = res.data;
      });
    },
    async fetch() {
      // alert(1)
      const res = await this.$http.get("categories");
      this.items = res.data;
    },
    handleClick(i) {
      console.log(i);
    },
    goToEdit(i) {
      console.log(i);
      this.$router.push(`/categories/edit/${i}`);
    },
    async remove(row) {
      console.log(row)
      this.$confirm(`是否确定删除分类${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`categories/${row._id}`)// eslint-disable-line no-unused-vars
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