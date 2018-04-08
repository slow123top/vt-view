<template>
  <Row class="register" type="flex" justify="center">
    <i-col class="register-col" span="6">
      <el-form status-icon class="register-form" ref="registerForm" :model="formData" :rules="formRule"
               label-width="80px">
        <h1>注册</h1>
        <hr>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPassword" label="确认密码">
          <el-input type="password" v-model="formData.checkPassword" placeholder="请再次输入密码">
          </el-input>
        </el-form-item>
        <el-form-item class="register-form-button">
          <el-button type="primary" @click="submitForm('registerForm')" style="width: 100%">注册</el-button>
        </el-form-item>
        <el-form-item class="register-form-button">
          <el-button type="danger" @click="resetForm('registerForm')" style="width: 100%">重置</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/login">已有账户登录</router-link>
        </el-form-item>
      </el-form>
    </i-col>
  </Row>
</template>
<script>
  import { register, validateUsername } from '../../api/httpmethods'

  export default {
    name: 'register',
    data () {
      let validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else if (value.length < 3 || value.length > 20) {
          callback(new Error('用户名长度3-20位'))
        } else if (!/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/.test(value)) {
          callback(new Error('用户名支持数字和字母和特殊符号至少2种'))
        } else {
          validateUsername({
            username: value
          }).then(res => {
            if (res.data.status === 'ERROR') {
              callback(new Error(res.data.message))
            } else {
              callback()
            }
          })
        }
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 3 || value.length > 20) {
          callback(new Error('密码长度3-20位'))
        } else if (!/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/.test(value)) {
          callback(new Error('密码支持数字和字母和特殊符号至少2种'))
        } else {
          if (this.formData.checkPassword !== '') {
            this.$refs.registerForm.validateField('checkPassword')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        formData: {
          username: '',
          password: '',
          checkPassword: '',
          userType: ''
        },
        formRule: {
          username: [
            {
              validator: validateUser,
              trigger: 'blur'
            }
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
//            校验成功  登录
            register({
              username: this.formData.username,
              password: this.formData.password,
              checkPassword: this.formData.checkPassword,
              userType: '0'
            }).then(res => {
              if (res.data.status === 'SUCCESS') {
                this.$message.success(res.data.message)
                this.$router.push('/login')
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
      },
      resetForm (form) {
        this.$refs[form].resetFields()
      }
    }
  }
</script>
<style scoped>
  .register {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url('../../img/timg.jpg');
    background-repeat: no-repeat;
    background-position: center;
  }

  hr {
    margin-bottom: 1rem;
  }

  .register-form {
    margin: 5rem 0;
    border-radius: .5rem;
    background-color: #fff;
    padding: 1rem;
  }

  h1 {
    font-family: "楷体";
  }

  .register-form-button {
    text-align: left;
  }
</style>
