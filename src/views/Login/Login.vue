<template>
  <div class="login_container">
    <div class="box">
      <div class="img_logo">
        <img src="@/assets/img/Login/logo.png" alt="" />
      </div>
      <!-- 表单 -->
      <!-- 用户名 -->
      <el-form
        label-width="0px"
        class="input_user"
        :model="loginForm"
        :rules="loginFormRules"
        ref="LoginForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按键 -->
        <el-form-item class="rout">
          <el-button type="primary" @click="Login">登录</el-button>
          <el-button type="info" @click="Loginreset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 用户账号密码
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    Loginreset() {
      this.$refs.LoginForm.resetFields()
    },
    Login() {
      this.$refs.LoginForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$Message.error('登录失败')
        this.$Message.success('登录成功')
        // 让sessionStorage携带我登录成功的token
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  // background-color: #2b4b6b;
  background-image: linear-gradient(
    to right,
    rgb(24, 224, 147),
    rgb(95, 80, 235)
  );
  width: 100%;
  height: 100%;
  .box {
    position: absolute;
    position: relative;
    top: 50%;
    left: 50%;
    width: 450px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    .img_logo {
      position: absolute;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
      width: 130px;
      height: 130px;
      background-color: aqua;
      border-radius: 50%;
      padding: 5px;
      box-shadow: 0 0 10px rgb(102, 143, 233);

      img {
        width: 100%;
      }
    }

    .input_user {
      position: relative;
      position: absolute;
      width: 300px;
      top: 30%;
      left: 17%;

      .rout {
        position: absolute;
        left: 75px;
      }
    }
  }
}
</style>