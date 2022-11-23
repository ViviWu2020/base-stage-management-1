<template>
  <div class="header-container">
    <div class="left-content">
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/images/bingdundun.png" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";

export default {
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    handleCommand(command) {
      if (command === "logout") {
        Cookie.remove("token");
        Cookie.remove("menu");
        this.$router.push("/login");
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>

<style scoped lang="less">
.left-content {
  display: flex;
  align-items: center;
  .el-button {
    margin: 0 12px;
  }
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;

      &.is-link {
        color: #6666;
      }
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: #ffff;
      }
    }
  }
}

.header-container {
  background: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .el-dropdown-link > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
