<template>
  <el-card class="box-card">

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >配置</el-breadcrumb-item>
      <el-breadcrumb-item>服务器</el-breadcrumb-item>
    </el-breadcrumb>
    


     <el-button size="mini" type="primary" icon="el-icon-plus"></el-button>

    <el-table :data="tableData" border size='small' show-header stripe style="width: 100%">
      <el-table-column prop="name" label="服务器名称" width="180"></el-table-column>
      <el-table-column prop="ip" label="服务器IP" width="180"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="update_time" label="更新时间"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    GetServerList() {
      this.$api.getServer().then(resp => {
        console.log(resp);
        this.tableData = resp["results"];
      });
    }
  },
  created() {
    this.GetServerList();
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  border-radius: 0;
  width: 100%;
}

.el-table {
  margin-top: 5px;
}

.el-breadcrumb{
  position: relative;
  font-size: 12px;
  top:-10px;
}
</style>
