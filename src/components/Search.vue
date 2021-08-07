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
import { mapState } from "vuex";
import { getPostList } from "../api/api";

export default {
  name: "Search",
  methods: {
    onSearch(keywords) {
      this.$store.commit("setSearchTitle", keywords);
      getPostList({
        title: this.searchTitle,
        pageNum: "",
        pageSize: "",
      }).then((res) => {
        if (res.code === 0) {
          this.categoryId = "";
          this.pageNum = Math.ceil(res.total / this.pageSize);
          this.$store.dispatch("setReversePostList", res);
          this.$emit("closePopUpAfterSearch", false);
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
  },
  computed: {
    ...mapState({
      searchTitle: "searchTitle",
      pageSize: "pageSize",
    }),
    pageNum: {
      get() {
        return this.$store.state.pageNum;
      },
      set(payload) {
        this.$store.commit("setPageNum", payload);
      },
    },
    categoryId: {
      get() {
        return this.$store.state.categoryId;
      },
      set(payload) {
        this.$store.commit("setCategoryId", payload);
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
