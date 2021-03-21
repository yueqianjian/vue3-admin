<template>
  <div class="login">
    <!-- <el-form class="form" ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" :rules="[$rules.req()]" prop="username">
        <el-input placeholder="请输入" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" :rules="[$rules.req(), $rules.pwd]" prop="pwd">
        <el-input placeholder="请输入" v-model="form.pwd"></el-input>
      </el-form-item>
    </el-form> -->
    <div class="box">
      <div class="title">Login</div>
      <!-- <el-form class="form" ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" :rules="[$rules.req()]" prop="username">
          <el-input placeholder="请输入" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          placeholder="username"
          :rules="[$rules.req(), $rules.pwd]"
          prop="pwd"
        >
          <el-input placeholder="请输入" v-model="form.pwd"></el-input>
        </el-form-item>
      </el-form> -->
      <div class="form-wrapper">
        <input
          type="text"
          name="username"
          placeholder="username"
          class="input-item"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          class="input-item"
        />
        <el-button class="btn">
          <span class="white">登陆</span>
        </el-button>
      </div>
      <div class="msg">Don`t have account? <a href="#">Sign up</a></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        pwd: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
$bg: linear-gradient(to right, #b2fefa, #0ed2f7);
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
  }
}

.form-wrapper .input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.form-wrapper .input-item::placeholder {
  text-transform: uppercase;
}

.form-wrapper .btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: $bg;
  color: #fff;
  border: none;
}

.msg {
  text-align: center;
  line-height: 80px;
}

.msg a {
  text-decoration-line: none;
  color: #a6c1ee;
}
</style>
