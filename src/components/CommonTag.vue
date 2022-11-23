<template>
  <div class="tabs">
    <el-tag v-for="(item, index) in tags" :key="item.path" :closable="item.name !== 'home'" :effect="$route.name === item.name ? 'dark' : 'plain'" @click="changeMenu(item)" @close="handleMenu(item, index)" size="mini" :disable-transitions="disableTransitions">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  margin-bottom: -10px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      disableTransitions: true,
    };
  },

  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    //点击 tag 跳转
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    //删除 tag
    handleMenu(item, index) {
      this.closeTag(item);
      const length = this.tags.length;
      //删除之后的跳转逻辑
      if (item.name !== this.$route.name) {
        return;
      }
      //删除的是最后一项，跳转到前一个的路由
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 中间的删除了，往后一个跳转
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>
