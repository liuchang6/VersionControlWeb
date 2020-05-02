<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>配置</el-breadcrumb-item>
      <el-breadcrumb-item>服务器</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-button
        class="add_btn"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="addServerDialogVisible()"
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
        <el-form-item label="IP" prop="ip">
          <el-input v-model="addForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="addForm.port"></el-input>
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
          @click="CheckServer('addForm')"
        >测试</el-button>
        <el-button
          size="small"
          :disabled="ConfirmSave"
          type="primary"
          v-if="this.flag === 'add'"
          @click="AddServer('addForm')"
        >确 定</el-button>
        <el-button
          size="small"
          :disabled="ConfirmSave"
          type="primary"
          v-if="this.flag === 'update'"
          @click="UpdateServer('addForm')"
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
      <el-table-column prop="name" label="服务器名称" width="120"></el-table-column>
      <el-table-column prop="ip" label="服务器IP" width="100"></el-table-column>
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
            icon="el-icon-s-platform"
            @click="ssh(scope.row.id)"
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editeServerDialogVisible(scope.row.id)"
          ></el-button>
          <el-popconfirm
            @onConfirm="deleteServerDialogVisible(scope.row.id)"
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
    var validcodeip = (rule, value, callback) => {
      const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("输入格式不合法！"));
      }
    };
    return {
      addForm: {
        name: "",
        ip: "",
        port: "",
        user: "",
        password: "",
        creater: this.getLocalValue('_user'),
        desc: "",
        check_time: "",
        create_time: "",
        status: 1,
      },
      rules: {
        port: [{ required: true, message: "端口不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        user: [{ required: true, message: "用户不能为空", trigger: "blur" }],
        ip: [
          { required: true, message: "ip不能为空", trigger: "blur" },
          {
            validator: validcodeip,
            trigger: "blur"
          }
        ]
      },
      search: "",
      tableData: [],
      total: 0,
      dialog_title: "",
      flag: "",
      serverid: "",
      addDialogVisible: false,
      CheckLoading: false,
      ConfirmSave: true
    };
  },
  methods: {
    addServerDialogVisible() {
      if (this.$refs["addForm"] !== undefined) {
        this.$refs["addForm"].resetFields();
      }
      this.flag = "add";
      this.dialog_title = "添加服务器";
      this.ConfirmSave = true;
      this.CheckLoading = false;
      this.addDialogVisible = true;
    },
    editeServerDialogVisible(id) {
      this.$api.getServer(id).then(resp => {
        this.addForm.name = resp["data"]["name"];
        this.addForm.ip = resp["data"]["ip"];
        this.addForm.port = resp["data"]["port"];
        this.addForm.user = resp["data"]["user"];
        this.addForm.password = window.atob(resp["data"]["password"]);
        this.addForm.desc = resp["data"]["desc"];
      });
      this.flag = "update";
      this.serverid = id;
      this.dialog_title = "编辑服务器";
      this.ConfirmSave = true;
      this.CheckLoading = false;
      this.addDialogVisible = true;
    },
    CheckServer(addForm) {
      this.CheckLoading = true;
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$api.checkServer(this.addForm).then(resp => {
            if (resp.success) {
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
    AddServer(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$api.addServer(this.addForm).then(resp => {
            if (resp.success) {
              this.$notify({
                message: resp["msg"],
                type: "success",
                duration: 2000
              });
              this.GetServerList();
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
    UpdateServer(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$api.updateServer(this.serverid, this.addForm).then(resp => {
            if (resp.success) {
              this.$notify({
                message: resp["msg"],
                type: "success",
                duration: 2000
              });
              this.GetServerList();
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
    deleteServerDialogVisible(id) {
      this.$api.deleteServer(id).then(resp => {
            if (resp.success) {
              this.GetServerList();
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
      this.$api.getServerList({ params: { page: val } }).then(resp => {
        this.tableData = resp["results"];
        this.total = resp["count"];
      });
    },
    GetServerList() {
      this.$api.getServerList().then(resp => {
        this.tableData = resp["results"];
        this.total = resp["count"];
      });
    },
    ssh(id) {
      this.$api.getServer(id).then(resp => {
        console.log(resp.data.password);
         this.setLocalValue("pw", resp.data.password);
         this.setLocalValue("user", resp.data.user);
         this.setLocalValue("ip", resp.data.ip);
         this.setLocalValue("port", resp.data.port);
      });
      const ref = this.$router.resolve({
        name: "ssh",
        query: { serverid: id }
      });
      window.open(ref.href, "_blank");
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
