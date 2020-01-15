<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
body{
  margin: 0;
  padding: 0;
}
#app{
  margin: 0;
  padding: 0;
}
.el-menu-item-group__title {
  display: none;
}


div.el-submenu__title {
  border: 1px  solid rgba(200,200,200,0.1); 
  
}

li.el-menu-item {
  border: 1px  solid rgba(200,200,200,0.1); 
  height: 45px;
  line-height: 42px;
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
    padding: 0 45px;
    min-width: 200px;
}

.el-menu-item, div.el-submenu__title {
    height: 45px;
    line-height: 42px;
    position: relative;
    white-space: nowrap;
    list-style: none;
}

</style>
