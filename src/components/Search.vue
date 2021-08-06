<template>
  <div class="search-keyword">
    <a-input-search
      placeholder="搜索关键字"
      style="width: 200px"
      class="search-keyword"
      @search="onSearch"
    />
  </div>
</template>

<script>
import { getPostList } from "../api/api";

export default {
  name: "Search",
  methods: {
    onSearch(keywords) {
      getPostList({ title: keywords }).then((res) => {
        if (res.code === 0) {
          this.$store.commit("setPostList", res.rows);
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
  },
  computed: {
    postList: {
      get() {
        return this.$store.state.postList;
      },
      set(payload) {
        this.$store.commit("setPostList", payload);
      },
    },
  },
};
</script>

<style scoped lang="less">
.search-keyword {
  margin: 0;
  width: 100% !important;
}
</style>
<style lang="less">
@text-color: #667c99;
@input-bg-color: #e8ecf3;

.search-keyword {
  .ant-input {
    border: none;
    background-color: @input-bg-color;
    &::placeholder {
      color: @text-color;
    }
  }
}
</style>
