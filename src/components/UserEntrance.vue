<template>
  <div v-show="alreadyLogin" class="user-entrance">
    <router-link class="go-to-user" to="/user">
      <div
        class="avatar-min"
        :style="
          `background: url(${
            userInfo ? userInfo.avatar : ''
          }) center center no-repeat`
        "
      ></div>
      <van-button>个人中心</van-button>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserEntrance",
  computed: {
    ...mapState({
      alreadyLogin: "alreadyLogin",
      userInfo: "userInfo",
    }),
  },
};
</script>

<style scoped lang="less">
.user {
  width: 100%;
  margin: 20px 0;
  .go-to-user {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &:active {
      background-color: #e8ecf3;
    }
    .avatar-min {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-size: cover;
    }
    button {
      padding: 0 10px;
    }
  }
}
</style>
