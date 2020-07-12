<template>
  <div>
    <h1>{{ id ? "编辑" : "新建"}}物品</h1>

    <el-form label-width="100px" @submit.native.prevent="save">
      <!-- <el-form-item label="父节点">
        <el-select v-model="model.parent">
          <el-option v-for="item in parent" :key="item._id" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:4400/admin/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model: {}
    };
  },
  methods: {
    handleAvatarSuccess(res) {
        console.log(res)
        this.$set(this.model,'icon',res.url)
        // this.model.icon = res.url
    },
    async save() {
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`items/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>