<template>
  <Row type="flex" justify="start" class="upload">
    <i-col span="24" class="upload-select-site">
      <span>上传站点：</span>
      <el-select v-model="siteValue" placeholder="请先选择上传站点" :clearable="true" @change="changeSiteOption"
                 @clear="clearSiteOption">
        <el-option
          v-for="(item,index) in siteName"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <span>文件类型：</span>
      <el-select v-model="fileValue" placeholder="请选择文件类型" :clearable="true" @change="changeFileOption"
                 @clear="clearFileOption">
        <el-option
          v-for="(item,index) in fileClass"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </i-col>
    <i-col span="12" class="upload-not-drag">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>单文件上传</span>
        </div>
        <el-upload ref="upload" :action="action" :before-upload="beforeUpload"
                   :disabled="canUpload"
                   :on-success="successRes">
          <el-button slot="trigger" type="primary">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">只能上传星表、文献或者光谱类文件</div>
        </el-upload>
      </el-card>

    </i-col>
    <i-col span="12" class="upload-not-drag">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>多文件上传</span>
        </div>
        <el-upload ref="upload" :action="action" multiple :before-upload="beforeUpload"
                   :disabled="canUpload"
                   :on-success="successRes">
          <el-button slot="trigger" type="primary">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">只能上传星表、文献或者光谱类文件</div>
        </el-upload>
      </el-card>

    </i-col>

    <i-col span="12" class="upload-drag">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可拖拽上传</span>
        </div>
        <el-upload
          drag
          :action="action"
          multiple
          :disabled="canUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-card>

    </i-col>
  </Row>
</template>
<script>
  export default {
    data () {
      return {
        action: 'http://192.168.11.24:3000/upload?mainType="1"',
        siteValue: '',
        fileValue: '',
        siteName: ['192.168.11.9',
          '192.168.9.179',
          '192.168.9.190',
          '192.168.9.217',
          '192.168.9.218'],
        fileClass: ['星表', '文献', '光谱'],
        canSiteUpload: true,
        canFileUpload: true
      }
    },
    computed: {
      canUpload () {
        return this.canSiteUpload || this.canFileUpload
      }
    },
    methods: {
      beforeUpload (file) {
        let fileName = file.name
        let typeIsTrue = file.type.includes('application')
        if (!typeIsTrue) {
          this.$message.error(`${fileName}文件格式不正确！`)
        }
        return typeIsTrue
      },
      successRes (res, file, fileList) {
        console.log(res, file, fileList)
      },
      submitUpload () {
        this.$refs.upload.submit()
      },
      changeSiteOption () {
        this.canSiteUpload = false
        this.action = `http://${this.siteValue}:3000/upload?mainType=${this.fileClass.indexOf(this.fileValue) + 1}`
        console.log(this.fileClass.indexOf(this.fileValue))
      },
      clearSiteOption () {
        this.canSiteUpload = true
      },
      changeFileOption () {
        this.canFileUpload = false
        this.action = `http://${this.siteValue}:3000/upload?mainType=${this.fileClass.indexOf(this.fileValue) + 1}`
        console.log(this.fileClass.indexOf(this.fileValue))
      },
      clearFileOption () {
        this.canFileUpload = true
      }
    },
    components: {}
  }
</script>
<style scoped>
  .upload {
    /*background-color: #fff;*/
    background-color: #fff;
  }

  .upload-select-site {
    padding: 1rem;
    text-align: left;

  }

  .upload-not-drag, .upload-drag {
    /*background-color: #fff;*/
    /*min-height: 10rem;*/
    padding: 1rem;
  }

  .clearfix {
    float: left;
  }

</style>
