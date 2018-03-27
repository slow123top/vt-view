<template>
  <Row class="login" type="flex" justify="center">
    <i-col class="login-col" span="5">
      <el-form class="login-form" ref="loginForm" :model="formData" :rules="formRule">
        <h1>欢迎登录</h1>
        <hr>
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名">
            <template slot="prepend">
              <Icon type="person" size="18"></Icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码">
            <template slot="prepend">
              <Icon type="locked" size="18"></Icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userType">
          <el-radio-group v-model="formData.userType">
            <el-radio label="0">管理员</el-radio>
            <el-radio label="1">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" style="width: 100%">登录</el-button>
          <router-link to="/register">没有账户？立即注册</router-link>
          <router-link to="/register" style="margin-left: 30%">忘记密码？</router-link>
        </el-form-item>
      </el-form>
    </i-col>
  </Row>
</template>
<script>
  import { login } from '../../api/httpmethods'

  export default {
    name: 'login',
    data () {
      return {
        formData: {
          username: '',
          password: '',
          userType: '0'
        },
        formRule: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {min: 3, max: 20, message: '长度不超过20个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 3, max: 20, message: '长度不超过20个字符', trigger: 'blur'}
          ]
        }
//        username: '',
//        password: ''
      }
    },
    methods: {
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
//            校验成功  登录
            login({
              username: this.formData.username,
              password: this.formData.password,
              userType: this.formData.userType
            }).then(res => {
              if (res.data.status === 'SUCCESS') {
                this.$store.dispatch('login', {
                  username: res.data.username,
                  token: res.data.token
                })
                this.$message.success(res.data.message)
                this.$router.push('/resource/foo/summary')
              } else if (res.data.status === 'ERROR') {
                console.log('adsa')
                this.$message.error(res.data.message)
              }
            })
              .catch(e => {
                this.$message.error(e)
              })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url('../../img/timg.jpg');
    background-repeat: no-repeat;
    background-position: center;
  }

  .login-col {

    /*height: 40%;*/
    /*padding: 1rem;*/
    /*margin: 5rem 0;*/
    /*border-radius: .5rem;*/
  }

  hr {
    margin-bottom: 1rem;
  }

  .login-form {
    margin: 5rem 0;
    border-radius: .5rem;
    background-color: #fff;
    padding: 1rem;
    text-align: center;
  }

  h1 {
    font-family: "楷体";
  }
</style>
