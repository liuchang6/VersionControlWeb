<template>
  <el-container>
    <el-header style="background: #FDFEFE ;margin: 0;padding: 0; height: 50px">
      <div>
        <div class="nav-header">
          <span style="color: white; font-size: 20px; margin-left: 20px">版本控制平台</span>
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
      <el-aside width="201px" style="background-color: #FDFEFF;">
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#FDFEFF"
          text-color="#595E62"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-setting"></i>
            <span slot="title">概览</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" style="tx">服务器</el-menu-item>
              <el-menu-item index="2-2">git仓库</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>项目</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" style="tx">项目管理</el-menu-item>
              <el-menu-item index="3-2">git仓库</el-menu-item>
            </el-menu-item-group>
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
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
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
  background: #1f537e;
  margin: 0 auto;
  font-size: 14px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  z-index: 100;
}
</style>
