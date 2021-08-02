<template>
  <div class="header-post">
    <mavon-editor />
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "HeaderPost",
  data() {
    return {
      editShow: false,
    };
  },
  methods: {
    showEditPopup() {
      this.editShow = true;
    },
  },
  components: {
    mavonEditor,
  },
};
</script>

<style scoped lang="less">
.header-post {
  .edit-btn {
    padding: 0;
    font-size: 1.6rem;
  }
  .edit-popup {
    height: 40%;
  }
}
</style>
