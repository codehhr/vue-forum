<template>
  <div>
    <page-header>
      <!-- 左侧导航 -->
      <template v-slot:left>
        <header-nav></header-nav>
      </template>

      <!-- 切换论题 -->
      <template v-slot:center>
        <switch-topics></switch-topics>
      </template>

      <!-- 发表新帖 -->
      <template v-slot:right>
        <router-link to="/post">
          <a-icon class="edit" type="form" />
        </router-link>
      </template>
    </page-header>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";
import HeaderNav from "../components/HeaderNav";
import SwitchTopics from "../components/SwitchTopics";

export default {
  name: "Index",
  mounted() {
    this.container = this.$refs.container;
  },
  components: {
    PageHeader,
    HeaderNav,
    SwitchTopics,
  },
};
</script>

<style scoped lang="less">
.edit {
  font-size: 1.1rem;
}
</style>
