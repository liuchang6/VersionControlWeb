<template>
  <el-container>
    <el-header style="background: #F7F7F7; padding: 0; height: 50px">
      <div>
        <div style="padding-top: 10px; margin-left: 10px;">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus"
            @click="addProject"
          >添加项目</el-button>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-main style="padding: 0; margin-left: 5px">
        <el-table
          highlight-current-row
          :data="projectData.results"
          border
          stripe
          :show-header="projectData.results.length > 0"
          style="width: 100%;"
          :header-cell-style="{
            'background-color': '#1989fa',
            'color': '#fff',
            'font-weight': '400'}"
          :row-style="{'height':'0'}"
          :cell-style="{'padding':'5px'}"
        >
          <el-table-column :show-overflow-tooltip="true" label="项目名称" width="200" align="center">
            <template slot-scope="scope">
              <span
              >{{ scope.row.project_name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="负责人" width="150" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.creater }}</span>
            </template>
          </el-table-column>

          <el-table-column label="项目描述" width="280" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>

          <el-table-column label="更新时间" width="200" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.update_time}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleCellClick(scope.row)">详情</el-button>

              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <el-button
                style="margin-left: 10px"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <span class="demonstration"></span>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total,  prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      currentPage:1,
      total:0,
      projectData: {
        results: []
      },
      projectForm: {
        project_name: "",
        desc: "",
        creater: "",
        id: ""
      },
     
    };
  },
  methods: {
    handleCurrentChange(val) {
        this.$api.getPagelist(val).then(resp => {
        this.projectData = resp;
        this.total = resp["count"]
      });
      },
    handleEdit(index, row) {
      this.$router.push({path:'/index/set_project',query:{ id: row['id'] }});
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$api.deleteProject({ data: { id: row["id"] } }).then(resp => {
          if (resp["success"]) {
            this.success(resp);
            this.getProjectList();
          } else {
            this.failure(resp);
          }
        });
      });
    },
    addProject(){
      this.$router.replace('/index/set_project');
    },
    getProjectList() {
      this.$api.getProjectList().then(resp => {
        this.projectData = resp;
        this.total = resp["count"]
      });
    },
  },
  created() {
    this.getProjectList();
  },
  name: "Project"
};
</script>

<style scoped>

.block {
  padding-left: 60%;
  margin-top:15px;
}
</style>
