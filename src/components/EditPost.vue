<template>
  <div class="post">
    <go-back></go-back>
    <!-- form -->
    <van-form class="post-form" @submit="submitPost" @failed="onFailed">
      <!-- 分类选择 -->
      <van-field
        readonly
        clickable
        name="categoryId"
        :value="category"
        label="选择分类"
        placeholder="点击选择分类"
        @click="showPicker = true"
        class="form-item"
      />
      <!-- 分类选择弹出框 -->
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="categoryNameList"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- title -->
      <van-field
        v-model="title"
        class="form-item"
        name="title"
        type="text"
        label="标题"
        placeholder="标题"
        :rules="[{ required: true, message: '请填写标题' }]"
      />
      <!-- subTitle -->
      <van-field
        v-model="subTitle"
        class="form-item"
        name="subTitle"
        type="text"
        label="子标题"
        placeholder="子标题 (可选)"
      />
      <!-- 描述 -->
      <van-field
        v-model="intro"
        class="form-item"
        type="textarea"
        name="intro"
        label="描述"
        placeholder="描述 ( 支持副文本 )"
      />
      <!-- 上传封面 -->
      <van-field class="form-item" name="coverImgUrl" label="文件上传">
        <template #input>
          <van-uploader v-model="uploader" multiple :max-count="1" />
        </template>
      </van-field>
      <div class="form-item">
        <van-button class="submit-btn" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <!-- 遮罩层 -->
    <div v-show="showMask" class="mask">
      <van-loading vertical size="80" color="#ffffff" class="loading">
        提交中...
      </van-loading>
    </div>
  </div>
</template>

<script>
import { getTopicsList, uploadImg, editPost, getPostDetail } from "../api/api";
import GoBack from "./GoBack";

export default {
  name: "EditPost",
  data() {
    return {
      showMask: false,
      category: "",
      title: "",
      subTitle: "",
      intro: "",
      uploader: [],
      categoryNameList: [],
      showPicker: false,
      showDialog: false,
      postsId: "",
      categoryId: "",
    };
  },
  methods: {
    // 分类选择确认
    onConfirm(value) {
      this.category = value;
      this.showPicker = false;
    },
    // 渲染分类选择器内容
    renderPickerList() {
      let topicList = [];
      getTopicsList().then((res) => {
        res.rows.forEach((item) => {
          topicList.push(item.name);
        });
      });
      this.categoryNameList = topicList;
    },
    // 发表前先上传图片
    uploadImgBeforePublish(fileObj) {
      uploadImg({
        file: fileObj.file,
        fileUseForEnum: fileObj.fileUseForEnum,
      }).then((uploadImgRes) => {
        if (uploadImgRes.code === 0) {
          // 同步实现先上传图片再发表
          // 把图片加入 values
          fileObj.values.url = uploadImgRes.url;
          this.post(fileObj.values);
        } else {
          this.$message.warning(uploadImgRes.msg);
        }
      });
    },
    // 提交
    submitPost(values) {
      this.showMask = true;
      // 上传图片
      if (values.coverImgUrl.length) {
        this.uploadImgBeforePublish({
          file: values.coverImgUrl[0].file,
          fileUseForEnum: "BBS",
          values,
        });
      } else {
        values.url = "";
        this.post(values);
      }
    },
    // 发表
    post(values) {
      editPost({
        postsId: this.postsId,
        categoryId: this.categoryId,
        title: values.title,
        subTitle: values.subTitle,
        intro: values.intro,
        coverImgUrl: values.url,
      })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("修改成功 ~");
            this.showMask = false;
            this.$router.push({ name: "index" });
          } else {
            this.$message.warning(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交失败
    onFailed(err) {
      this.$message.warning(err);
    },
    // 获取当前帖子
    getPostItem(postsId) {
      getPostDetail(postsId).then((res) => {
        let postItem = res.data;
        this.categoryId = postItem.categoryId;
        this.category = this.categoryNameList[this.categoryId - 1];
        this.title = postItem.title;
        this.subTitle = postItem.subTitle;
        this.intro = postItem.intro;
      });
    },
  },
  components: {
    GoBack,
  },
  created() {
    this.postsId = this.$route.params.postsId;
    this.getPostItem(this.$route.params.postsId);
    this.renderPickerList();
  },
};
</script>

<style scoped lang="less">
@main-color: #667c99;
@main-font-size: 0.9rem;
@submit-btn-font-size: 1rem;
.post {
  position: relative;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.post-form {
  height: 100%;
  padding: 40px 20px 0;
  .form-item {
    margin: 0 10px 40px;
    font-size: @main-font-size;
  }
  .submit-btn {
    font-size: @submit-btn-font-size;
    background-color: @main-color;
  }
}
</style>
<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
