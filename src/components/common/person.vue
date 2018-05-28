<template>
  <Row type="flex" justify="center" class="common-person">
    <i-col :span="24" class="common-person-attr">
      <h1>个人主页</h1>
    </i-col>
    <i-col :span="24" class="common-person-attr">
      <div class="common-person-name">头像</div>
      <div class="common-person-content">
        <Avatar :src="avatarAddr" style="width: 6rem;height: 6rem;border-radius: 50%"/>
        <el-upload
          class="upload-demo"
          :action="'http://localhost:8000/imageUpload?username='+$store.state.username"
          :format="['jpg','jpeg','png']"
          :on-success="handSuccess"
          :max-size="2048"
          list-type="picture" style="display: inline-block;margin-left: 1rem;vertical-align: middle">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2M</div>
        </el-upload>
      </div>
    </i-col>
    <i-col :span="24" class="common-person-attr">
      <div class="common-person-name">用户名</div>
      <div class="common-person-content">
        <el-input
          placeholder="请输入用户名"
          v-model="$store.state.username">
        </el-input>
      </div>
      <!--<div class="common-person-action">-->
      <!---->
      <!--</div>-->
    </i-col>
    <i-col :span="24" class="common-person-attr">
      <div class="common-person-name">职位</div>
      <div class="common-person-content">
        <el-input
          placeholder="可输入职位"
          v-model="$store.state.username">
        </el-input>
      </div>

    </i-col>
    <i-col :span="24" class="common-person-attr">
      <div class="common-person-name">个人介绍</div>
      <div class="common-person-content">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入个人信息"
          v-model="infomation">
        </el-input>
      </div>
    </i-col>
    <!--<i-col :span="24">-->
    <!--<el-button type="primary" size="small" style="margin-left: 10rem">保存</el-button>-->
    <!--</i-col>-->
  </Row>
</template>

<script>
  import PersonAvatar from './avatar'
  import { getUserInfo } from '../../api/httpmethods'

  export default {
    name: 'person',
    mounted () {
      getUserInfo({
        username: this.$store.state.username
      }).then(res => {
        let data = res.data.data
        this.avatarAddr = data.avatarAddr
        this.introduction = data.introduction
        this.career = data.career
      })
    },
    data () {
      return {
        infomation: '',
        avatarAddr: '',
        introduction: '',
        career: ''
      }
    },
    methods: {
      handlePreview () {

      },
      handleRemove () {
      },
      handSuccess (response, file, fileList) {
        if (response.status === 'SUCCESS') {
          this.$message.success(response.message)
          this.avatarAddr = `http://localhost:8000/images/${file.name}`
          getUserInfo({
            username: localStorage.getItem('username')
          }).then(res => {
            let data = res.data.data
            this.$store.dispatch('login', {
              username: data.username,
              type: data.type,
              token: data.token,
              avatarAddr: data.avatarAddr,
              introduction: data.introduction,
              career: data.career
            })
          })
        }
      }
    },
    components: {
      PersonAvatar
    }
  }
</script>

<style scoped>
  .common-person {
    background-color: #fff;
    text-align: left;
    padding: 1rem 2rem;
  }

  .common-person-attr {
    vertical-align: top;
    padding: 1rem 0;
    border-bottom: 1px solid #f0f0f8;
  }

  .common-person-attr span {

  }

  div.common-person-content {
    display: inline-block;
    margin-left: 5rem;
  }

  .common-person-name {
    display: inline-block;
    vertical-align: top;
    width: 5rem;
    text-align: right;
    font-size: 1rem;
  }
</style>
