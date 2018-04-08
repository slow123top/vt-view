<template>
  <Row type="flex" justify="center" class="common-person">
    <i-col :span="24" class="common-person-attr">
      <h1>个人主页</h1>
    </i-col>
    <i-col :span="24" class="common-person-attr">
      <div class="common-person-name">头像</div>
      <div class="common-person-content">
        <Avatar src="" style="width: 6rem;height: 6rem;border-radius: 50%"/>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture" style="display: inline-block">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </i-col>
    <i-col :span="24" class="common-person-attr">
      <div class="common-person-name">用户名</div>
      <div class="common-person-content">
        <el-input
          placeholder="请输入用户名"
          v-model="$store.state.username"
          :disabled="true">
        </el-input>
      </div>
    </i-col>
    <i-col :span="24" class="common-person-attr">
      <div class="common-person-name">职位</div>
      <div class="common-person-content">

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
  </Row>
</template>

<script>
  import PersonAvatar from './avatar'

  export default {
    name: 'person',
    data () {
      return {
        infomation: ''
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
