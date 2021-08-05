<template>
  <div class="post-text">
    <van-form @submit="submitPost" @failed="onFailed">
      <!-- 分类选择 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="category"
        label="选择器"
        placeholder="选择分类"
        @click="showPicker = true"
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
        name="title"
        type="text"
        label="标题"
        placeholder="标题"
        :rules="[{ required: true, message: '请填写标题' }]"
      />
      <van-field
        v-model="intro"
        type="text"
        name="intro"
        label="描述"
        placeholder="描述"
        :rules="[{ required: true, message: '请填写描述' }]"
      />
      <!-- 上传封面 -->
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
      <div>
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getTopicsList } from "../api/api";
export default {
  name: "PostHtml",
  data() {
    return {
      category: "",
      title: "",
      intro: "",
      uploader: [{ url: "https://img01.yzcdn.cn/vant/leaf.jpg" }],
      categoryList: [],
      showPicker: false,
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
    // 提交
    submitPost(values) {
      console.log(values);
    },
    //  提交失败
    onFailed(err) {
      this.$message.warning(err);
    },
  },
  created() {
    this.renderPickerList();
  },
};
</script>

<style scoped lang="less">
.post-text {
  height: 100%;
  padding: 20px;
}
</style>
