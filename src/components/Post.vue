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
        :rules="[{ required: true, message: '请选择分类' }]"
      />
      <!-- 分类选择弹出框 -->
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="categoryList"
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
        :rules="[{ required: true, message: '请填写描述' }]"
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
        发布中...
      </van-loading>
    </div>
  </div>
</template>

<script>
import { getTopicsList, newPost, uploadImg } from "../api/api";
import GoBack from "./GoBack";

export default {
  name: "Post",
  data() {
    return {
      showMask: false,
      category: "",
      title: "",
      subTitle: "",
      intro: "",
      uploader: [],
      categoryList: [],
      showPicker: false,
      showDialog: false,
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
      this.categoryList = topicList;
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
      if (values.coverImgUrl.length == 0) {
        this.$message.warning("请上传封面 ~");
      } else {
        this.showMask = true;
        // 上传图片
        this.uploadImgBeforePublish({
          file: values.coverImgUrl[0].file,
          fileUseForEnum: "BBS",
          values,
        });
      }
    },
    // 发表
    post(values) {
      newPost({
        categoryId: this.categoryList.indexOf(values.categoryId) + 1,
        title: values.title,
        subTitle: values.subTitle,
        intro: values.intro,
        coverImgUrl: values.url,
      })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("发表成功 ~");
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
    //  提交失败
    onFailed() {
      this.$message.warning("你不对劲 ~");
    },
  },
  components: {
    GoBack,
  },
  created() {
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
<style lang="less">
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
