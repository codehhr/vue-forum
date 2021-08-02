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
export default {
  name: "Search",
};
</script>

<style scoped></style>
