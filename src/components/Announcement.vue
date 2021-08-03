<template>
  <!-- 公告 -->
  <div class="announcement">
    <div class="catrgory-tag">
      <a-tag :color="color">
        {{ categoryName }}
        程序员
      </a-tag>
    </div>
    <slot name="title"></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Announcement",
  data() {
    return {
      topicsList: [],
      color: "#87d068",
    };
  },
  created() {
    switch (this.categoryId) {
      case 1:
        this.color = "#87d068";
        break;
      case 2:
        this.color = "#2db7f5";
        break;
      case 3:
        this.color = "#4b93d1";
        break;
      case 4:
        this.color = "#00ccff";
        break;
      case 5:
        this.color = "#bf5255";
        break;
      case 6:
        this.color = "#4b8f83";
        break;
      case 7:
        this.color = "#d68b4f";
        break;
      case 8:
        this.color = "#a0e585";
        break;
      case 9:
        this.color = "#fdc086";
        break;
      case 10:
        this.color = "#9354ca";
        break;
      case 11:
        this.color = "#e8ecf3";
        break;
      case 12:
        this.color = "#a0e585";
        break;
      case 13:
        this.color = "#d68b4f";
        break;
      case 14:
        this.color = "#bf5255";
        break;
      case 15:
        this.color = "#00ccff";
        break;
      case 16:
        this.color = "#4b93d1";
        break;
      case 17:
        this.color = "#2db7f5";
        break;
      default:
        this.color = "#494f5c";
        break;
    }
  },
  computed: {
    ...mapState({
      categoryId: "categoryId",
      categoryName: "categoryName",
    }),
  },
};
</script>

<style scoped lang="less">
@announcement-bg-color: #e8ecf3;
@catrgory-tag-span-font-size: 1rem;

.announcement {
  height: 100px;
  background-color: @announcement-bg-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .catrgory-tag {
    margin: 10px 0;
    span {
      padding: 4px 8px;
      font-size: @catrgory-tag-span-font-size;
      border-radius: 6px;
    }
  }
}
</style>
<style lang="less">
.announcement {
  > div {
    h2 {
      letter-spacing: 0.8rem;
    }
  }
}
</style>
