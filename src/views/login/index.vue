<template>
  <div class="login">
    <div class="box">
      <div class="title">Login</div>
      <el-form class="form" ref="form" :model="form">
        <el-form-item :rules="[$rules.req()]" prop="username">
          <el-input placeholder="username" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item :rules="[$rules.req(), $rules.pwd]" prop="pwd">
          <el-input
            type="password"
            placeholder="password"
            v-model="form.pwd"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button class="login-btn" @click="login">
        <span class="white">登录</span>
      </el-button>
      <el-radio-group @change="changeRole" v-model="role" v-pm:m="`20px 0 0`">
        <el-radio v-for="(item, index) in roleList" :key="index" :label="index">
          {{ item.role }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
import { setS } from "@/utils/tools";
import { initRouter } from "@/routers/index";
import adminRoutes from "@/routers/admin";
import guestRoutes from "@/routers/guest";

export default {
  data() {
    return {
      form: {
        username: "",
        pwd: "",
        role: "",
      },
      role: 0,
      roleList: [
        {
          role: "Admin",
          username: "Admin",
          pwd: "123456",
        },
        {
          role: "Guest",
          username: "Guest",
          pwd: "123456",
        },
      ],
    };
  },
  computed: {
    redirect() {
      return this.$route.query.redirect || "/home";
    },
  },
  created() {
    this.changeRole();
  },
  methods: {
    login() {
      // 表单验证成功进行登录
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 登录成功设置token 和 role
          const { role } = this.form;
          setS("role", role);
          this.$store.commit("user/setData", {
            k: "role",
            v: role,
          });
          setS("token", role);
          this.$store.commit("user/setData", {
            k: "token",
            v: role,
          });
          // 根据role进行动态增加路由
          initRouter();
          this.$router.push(this.redirect);
        }
      });
    },
    changeRole(e = 0) {
      let item = this.roleList[e];
      this.form = this.$copy(item);
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: linear-gradient(to right, #36d1dc, #5b86e5);
.login {
  height: 100vh;
  background-image: $bg;
  .box {
    background-color: #fff;
    width: 350px;
    height: 500px;
    border-radius: 15px;
    padding: 0 50px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      line-height: 200px;
    }
    .login-btn {
      text-align: center;
      padding: 10px;
      width: 100%;
      margin-top: 40px;
      background-image: $bg;
      color: #fff;
      border: none;
      &:active {
        opacity: 0.7;
      }
    }
  }
}
</style>
