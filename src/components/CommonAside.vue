<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{ isCollapse ? "后台" : "后台通用管理系统" }}</h3>
    <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.label" @click="clickMenu(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-` + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item :index="subItem.label" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}

.el-menu {
  border: none;
  height: 100vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {};
  },
  computed: {
    menuData() {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu;
    },
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    clickMenu(item) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
      }
      this.$store.commit("selectMenu", item);
      
    },
  },
};
</script>
