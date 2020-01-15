<template>
  <el-container>
    <el-header style="background: #fff;margin: 0;padding: 0; height: 50px">
      <div>
        <div class="nav-header">
          <span style="color: white; font-size: 25px; margin-left: 10px">FasterRunner 接口自动化测试平台</span>
          <span class="right">
            <div style="float: right; color: #d9d9d9; margin-right: 100px">
              <i class="iconfont">&#xe61c;</i>
              <span v-text="this.$store.user" style="padding-left: 5px; font-size: large"></span>
              <a style="padding-left: 10px;">注 销</a>
            </div>
          </span>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>概览
            </template>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>配置
            </template>
            <el-menu-item-group>
              <template slot="title">服务器</template>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">git</el-menu-item>
            </el-menu-item-group>
           
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>导航三
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {}
};
</script>

<style scoped>

.left {
  
  width: 180px;
  left: 20px;
  display: inline-block;
  position: fixed;
  z-index: 900;
  top: -5px;
}

.right {
  position: fixed;
  left: 300px;
  right: 0;
  top: 0;
}

.right div a:hover {
  color: darkcyan;
}

.logo {
  background: white;
  height: 40px;
}

.nav-header {
  position: fixed;
  background: #242f42;
  margin: 0 auto;
  font-size: 14px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  height: 49px;
  line-height: 49px;
  z-index: 100;
}

.common-side-bar {
  position: fixed;
  top: 49px;
  border-right: 1px solid #ddd;
  height: 100%;
  width: 202px;
  background-color: #fff;
  display: inline-block;
}
.el-main {
  padding: 0px;
}
</style>
