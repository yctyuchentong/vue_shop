<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png"/>
      </div>
      <!-- 登录区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form" >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"
                    prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    ></el-input>
        </el-form-item>
        <el-form class="btns">
          <el-button type="success" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
        loginForm:{
          username:'admin',
          password:'123456'
        },
        loginFormRules:{
          username:[  { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
          password:[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }]

        }
      }
    },
    methods:{
      resetLoginForm(){
        this.$refs.loginFormRef.resetFields(); 
      },
      // 实现表单与验证
      login(){
        this.$refs.loginFormRef.validate(async vaild=>{
          if(!vaild) return;
          const {data:res} = await this.$http.post("login",this.loginForm);
          console.log(res)
          if(res.meta.status!==200) return this.$message.error("登录失败！")
          this.$message.success("登录成功！")

          window.sessionStorage.setItem("token",res.data.token);
          this.$router.push("/home");
        })
      }
    }
}
</script>

<style scoped>
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);

  }
  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0  0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
  }

  .avatar_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing:border-box;
  }
</style>