<template>
  <!-- 卡片视图区域 -->
  <el-card>
    <!-- 选择商品分类区域 -->

    <el-form :model="AddProject" :rules="rules" ref="AddProject" label-width="80px">
      <!-- tab 页签区域 -->
      <el-tabs :tab-position="'left'">
        <el-tab-pane label="项目信息">
          <el-card class="box-card">
            <el-form-item prop="project_name" label="项目名称">
              <el-input v-model="AddProject.project_name"></el-input>
            </el-form-item>
            <el-form-item prop="desc" label="描述">
              <el-input v-model="AddProject.desc"></el-input>
            </el-form-item>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="服务配置">
          <el-card class="box-card">
            <el-form-item prop="service.service_name" label="服务名称">
              <el-input v-model="AddProject.service.service_name"></el-input>
            </el-form-item>
            <el-form-item prop="service.git_url" label="git地址">
              <el-input v-model="AddProject.service.git_url"></el-input>
            </el-form-item>
            <el-form-item prop="service.git_user" label="git账号">
              <el-input v-model="AddProject.service.git_user"></el-input>
            </el-form-item>
            <el-form-item prop="service.git_password" label="git密码">
              <el-input v-model="AddProject.service.git_password"></el-input>
            </el-form-item>
            <el-form-item prop="service.branch" label="分支">
              <el-select v-model="AddProject.service.branch" placeholder="请选择">
                <el-option
                  v-for="item in branches"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button
              :loading="ConfirmLoading"
              class="check_btn"
              @click="Check('AddProject')"
              type="primary"
            >测试连接</el-button>
            <el-button
              :disabled="ConfirmSave"
              type="primary"
              class="save_btn"
              @click="Save('AddProject')"
            >保 存</el-button>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      AddProject: {
        project_name: "",
        desc: "",
        creater: "someone",
        service: {
          service_name: "",
          git_url: "",
          git_user: "",
          git_email: "",
          git_password: "",
          branch: "请选择",
          creater: "someone"
        }
      },
      branches: "",
      branch: "",
      ConfirmLoading: false,
      ConfirmSave: true,
      rules: {
        project_name: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        "service.service_name": [
          { required: true, message: "服务名称不能为空", trigger: "blur" }
        ],
        "service.git_url": [
          { required: true, message: "git地址不能为空", trigger: "blur" }
        ],
        "service.git_user": [
          { required: true, message: "git账号不能为空", trigger: "blur" }
        ],
        "service.git_password": [
          { required: true, message: "git密码不能为空", trigger: "blur" }
        ],
        "service.branch": {
          required: true,
          message: "git分支不能为空",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    Check(formName) {
      this.ConfirmLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.CheckService(this.AddProject.service).then(resp => {
            if (resp.success) {
              this.$notify({
                message: resp["msg"],
                type: "success",
                duration: 2000
              });
              this.ConfirmLoading = false;
              this.ConfirmSave = false;

              this.branches = resp["data"]["branches"];
            } else {
              this.$notify.error({
                message: resp["msg"],
                duration: 2000
              });
              this.ConfirmLoading = false;
            }
          });
        } else {
          this.$notify.error({
            message: "服务器错误",
            duration: 2000
          });
          this.ConfirmLoading = false;
        }
      });
    },
    Save(formName) {
      if (this.$route.query.id) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$api.updateProject(this.$route.query.id,this.AddProject).then(resp => {
              if (resp.success) {
                this.$notify({
                  message: '更新数据成功',
                  type: "success",
                  duration: 2000
                });
                this.$router.replace("/index/project");
              } else {
                this.$notify.error({
                  message: '更新数据失败',
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
      }else{
         this.$refs[formName].validate(valid => {
          if (valid) {
            this.$api.addProject(this.AddProject).then(resp => {
              if (resp.success) {
                this.$notify({
                  message: resp["msg"],
                  type: "success",
                  duration: 2000
                });
                this.$router.replace("/index/project");
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
      }
    }
  },
  mounted() {
    this.ConfirmSave= false,
    this.$api.getProjectList(this.$route.query.id).then(resp => {
      this.AddProject = resp["data"];
    });
  }
};
</script>

<style scoped>
.check_btn {
  position: relative;
  left: 372px;
  top: -62px;
}
.save_btn {
  position: relative;
  left: 290px;
}
.el-tabs__header {
  width: 500px;
}

.el-tabs {
  width: 100%;
  z-index: inherit;
}

.el-input {
  width: 80%;
}
.text {
  font-size: 14px;
}

.box-card {
  width: 60%;
}
</style>