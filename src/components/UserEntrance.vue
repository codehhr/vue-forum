<template>
  <div v-show="alreadyLogin" class="user-entrance">
    <van-cell class="go-to-user" @click="showUserPopup">
      <div
        class="avatar-min"
        :style="
          `background: url(${
            alreadyLogin
              ? userInfo.avatar
                ? userInfo.avatar
                : 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
              : 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
          }) 50% 50% no-repeat`
        "
      ></div>
      <span>个人中心</span>
    </van-cell>
    <van-popup class="user-popup" position="bottom" v-model="userCenterShow">
      <div class="user" @click="goToUserCenter">
        <a-icon type="user" />
        <span>个人主页</span>
      </div>
      <div class="logout" @click="requestLogOut">
        <a-icon type="logout" />
        <span>退出登录</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { logOut } from "../api/api";

export default {
  name: "UserEntrance",
  data() {
    return {
      userCenterShow: false,
    };
  },
  methods: {
    showUserPopup() {
      this.userCenterShow = true;
    },
    goToUserCenter() {
      this.$router.push({ name: "user" });
    },
    requestLogOut() {
      logOut().then(() => {
        this.$message.success(" 已退出登录 ~");
        this.userCenterShow = false;
        this.$emit("requestClosePopup", false);
        this.$store.commit("setLoginStatus", {
          alreadyLogin: false,
          userInfo: null,
        });
      });
    },
  },
  computed: {
    ...mapState({
      alreadyLogin: "alreadyLogin",
      userInfo: "userInfo",
    }),
  },
};
</script>

<style scoped lang="less">
@text-color: #667c99;
@font-size: 0.9rem;

.user-entrance {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  .go-to-user {
    width: 100%;
    height: 100%;
    > div {
      padding: 0 10px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden;
      &:active {
        background-color: #e8ecf3;
      }
      .avatar-min {
        float: left;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-size: cover !important;
      }
      span {
        margin: 0 10px;
        font-size: 1rem;
        color: @text-color;
      }
    }
  }
  .user-popup {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    > div {
      padding: 12px 20px;
      width: 100%;
      text-align: left;
      border-radius: 20px;
      font-size: @font-size;
      &:active {
        background-color: #e8ecf3;
      }
      span {
        margin: 0 10px;
        color: @text-color;
      }
    }
  }
}
</style>
<style lang="less"></style>
