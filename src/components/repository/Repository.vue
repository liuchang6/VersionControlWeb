<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>配置</el-breadcrumb-item>
      <el-breadcrumb-item>代码仓库</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-button
        class="add_btn"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="addRepositoryDialogVisible()"
      >添加</el-button>

      <el-input
        class="search_input"
        size="mini"
        label="名称"
        style="width:200px;"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search"
      ></el-input>
    </div>

    <el-dialog :title="dialog_title" :visible.sync="addDialogVisible" width="35%">
      <el-form
        :label-position="'right'"
        :rules="rules"
        ref="addForm"
        size="small"
        label-width="80px"
        :model="addForm"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-tooltip v-if="this.addForm.url !== ''" class="item" effect="light" :content="this.addForm.url" placement="right" style="margin-bottom: 0px;">
            <el-input v-model="addForm.url"></el-input>
          </el-tooltip>
          <el-input v-else v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="user">
          <el-input v-model="addForm.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" style="width:290px;" v-model="addForm.desc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
        <el-button
          :loading="CheckLoading"
          size="small"
          type="primary"
          @click="CheckRepository('addForm')"
        >测试</el-button>
        <el-button
          size="small"
          :disabled="ConfirmSave"
          type="primary"
          v-if="this.flag === 'add'"
          @click="AddRepository('addForm')"
        >确 定</el-button>
        <el-button
          size="small"
          :disabled="ConfirmSave"
          type="primary"
          v-if="this.flag === 'update'"
          @click="UpdateRepository('addForm')"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-table
      :header-cell-style="{'text-align':'center'}"
      :data="tableData"
      border
      size="small"
      show-header
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="name" label="仓库名称" width="120"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="url" label="仓库地址" width="280"></el-table-column>
      <el-table-column prop="user" label="用户" width="80"></el-table-column>
      <el-table-column prop="creater" width="80" label="创建人"></el-table-column>
      <el-table-column prop="status" width="80" label="连接状态">
        <template slot-scope="scope">
          <i v-if="scope.row.status === '1'" style="color:#7BCA3D;" class="el-icon-success"></i>
          <i v-if="scope.row.status === '0'" style="color:#EC7575;" class="el-icon-error"></i>
        </template>
      </el-table-column>
      <el-table-column prop="check_time" label="上次检测时间"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="update_time" label="更新时间"></el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editeRepositoryDialogVisible(scope.row.id)"
          ></el-button>
          <el-popconfirm
            @onConfirm="deleteRepositoryDialogVisible(scope.row.id)"
            confirmButtonText="确定"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
          >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              slot="reference"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="1"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      addForm: {
        name: "",
        url: "",
        user: "",
        password: "",
        creater: this.getLocalValue('_user'),
        desc: "",
        check_time: "",
        create_time: "",
        status: 1,
        branches:"",
      },
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        user: [{ required: true, message: "用户不能为空", trigger: "blur" }],
        url: [{ required: true, message: "url不能为空", trigger: "blur" },]
      },
      search: "",
      tableData: [],
      total: 0,
      dialog_title: "",
      flag: "",
      repositoryid: "",
      addDialogVisible: false,
      CheckLoading: false,
      ConfirmSave: true
    };
  },
  methods: {
    addRepositoryDialogVisible() {
      if (this.$refs["addForm"] !== undefined) {
        this.$refs["addForm"].resetFields();
        this.addForm.desc='';
      };
      this.flag = "add";
      this.dialog_title = "添加代码仓库";
      this.ConfirmSave = true;
      this.CheckLoading = false;
      this.addDialogVisible = true;
    },
    editeRepositoryDialogVisible(id) {
      if (this.$refs["addForm"] !== undefined) {
        this.$refs["addForm"].resetFields();
      };
      this.$api.getRepository(id).then(resp => {
        this.addForm.name = resp["data"]["name"];
        this.addForm.url = resp["data"]["url"];
        this.addForm.user = resp["data"]["user"];
        this.addForm.password = window.atob(resp["data"]["password"]);
        this.addForm.desc = resp["data"]["desc"];
      });
      this.flag = "update";
      this.repositoryid = id;
      this.dialog_title = "编辑代码仓库";
      this.ConfirmSave = true;
      this.CheckLoading = false;
      this.addDialogVisible = true;
    },
    CheckRepository(addForm) {
      this.CheckLoading = true;
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$api.checkRepository(this.addForm).then(resp => {
            if (resp.success) {
              this.addForm.branches = String(resp.data);
              this.$notify({
                message: resp["msg"],
                type: "success",
                duration: 2000
              });
              this.CheckLoading = false;
              this.ConfirmSave = false;
            } else {
              this.$notify.error({
                message: resp["msg"],
                duration: 2000
              });
              this.CheckLoading = false;
              this.ConfirmSave = true;
            }
          });
        } else {
          this.$notify.error({
            message: "服务器错误",
            duration: 2000
          });
          this.CheckLoading = false;
          this.ConfirmSave = true;
        }
      });
    },
    AddRepository(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$api.addRepository(this.addForm).then(resp => {
            if (resp.success) {
              this.$notify({
                message: resp["msg"],
                type: "success",
                duration: 2000
              });
              this.GetRepositoryList();
              this.addDialogVisible = false;
            } else {
              this.$notify.error({
                message: resp["msg"],
                duration: 2000
              });
            }
          });
        } else {
          this.$notify.error({
            message: "服务器错误",
            duration: 2000
          });
        }
      });
    },
    UpdateRepository(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$api.updateRepository(this.repositoryid, this.addForm).then(resp => {
            if (resp.success) {
              this.$notify({
                message: resp["msg"],
                type: "success",
                duration: 2000
              });
              this.GetRepositoryList();
              this.addDialogVisible = false;
            } else {
              this.$notify.error({
                message: resp["msg"],
                duration: 2000
              });
            }
          });
        } else {
          this.$notify.error({
            message: "服务器错误",
            duration: 2000
          });
        }
      });
    },
    deleteRepositoryDialogVisible(id) {
      this.$api.deleteRepository(id).then(resp => {
            if (resp.success) {
              this.GetRepositoryList();
              this.$notify({
                message: resp["msg"],
                type: "success",
                duration: 2000
              });
              }
              else {
              this.$notify.error({
                message: resp["msg"],
                duration: 2000
              });
              }
              });
     
    },
    handleCurrentChange(val) {
      this.$api.getRepositoryList({ params: { page: val } }).then(resp => {
        this.tableData = resp["results"];
        this.total = resp["count"];
      });
    },
    GetRepositoryList() {
      this.$api.getRepositoryList().then(resp => {
        this.tableData = resp["results"];
        this.total = resp["count"];
      });
    },
  },
  created() {
    this.GetRepositoryList();
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

div.el-input {
  width: 290px;
}

.add_btn {
  margin-top: 10px;
}

.search_input {
  margin-left: 800px;
}

i.el-icon-success {
  padding: 0;
}

.el-table {
  margin-top: 20px;
}

.el-breadcrumb {
  position: relative;
  font-size: 12px;
  top: -10px;
}

button.el-button--danger {
  margin-left: 10px;
 
}

.el-button--mini,
.el-button--mini.is-round {
  padding: 9px 16px;
}

.el-pagination {
  margin: 10px;
  margin-left: 75%;
  padding-right: 10px;
}
</style>
