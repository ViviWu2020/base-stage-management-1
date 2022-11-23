<template>
  <el-form ref="form" class="login-container" :model="form" :rules="rules" :inline="true" label-width="70px">
    <h3 class="login-title">系统登录</h3>
    <el-form-item prop="username" label="用户名">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu, addMenu } from "../api/index";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods: {
    //登录
    submit() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          getMenu(this.form).then(({ data }) => {
            if(data.code === 20000){
              Cookie.set('token', data.data.token)
              this.$store.commit('setMenu', data.data.menu)
              //当前 router 实例
              this.$store.commit('addMenu', this.$router)
              this.$router.push("/home");
            }else{
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  .login-title {
    text-align: center;
    margin-bottom: 40px;
    color: #505485;
    font-weight: bold;
  }
  .el-input {
    width: 198px;
  }
  .el-button {
    margin-left: 105px;
    margin-top: 10px;
  }
}
</style>
