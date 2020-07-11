<template>
  <div>
    <h1>{{ id ? "编辑" : "新建"}}分类</h1>

    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="父节点">
        <el-select v-model="model.parent">
          <el-option v-for="item in parent" :key="item._id" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parent: []
    };
  },
  methods: {
    // async save () {
    // const res = await this.$http.post('categories',this.model)
    // this.$router.push('/categories/list')
    async save() {
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParent() {
      const res = await this.$http.get(`categories`);
      this.parent = res.data;
    }
  },
  created() {
    this.fetchParent();
    this.id && this.fetch();
  }
};
</script>