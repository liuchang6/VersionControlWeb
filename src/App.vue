<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #fff;
}

body {
  color: #333;
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
#app {
  margin: 0;
  padding: 0;
}
div.el-menu-item-group__title {
  display: none;
  padding-left: 38px;
}

div.el-submenu__title {
  border: 1px solid rgba(200, 200, 200, 0.1);
}

li.el-menu-item {
  border: 1px solid rgba(200, 200, 200, 0.1);
  height: 45px;
  line-height: 42px;
  width: 201px;
}

li.el-menu-item.is-active {
  background-color: aquamarine;
}

li.el-submenu.is-active .el-submenu__title {
  border-bottom-color: #ffffff;
}

.el-submenu li.el-menu-item {
  height: 45px;
  line-height: 42px;
  padding: 0 36px;
  min-width: 200px;
}

.el-menu-item,
div.el-submenu__title {
  height: 45px;
  line-height: 42px;
  position: relative;
  white-space: nowrap;
  list-style: none;
}
</style>
