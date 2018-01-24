<template>
  <Row type="flex" justify="start">
    <i-col :span="20">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="赤经">
          <el-input v-model="formData.ra" placeholder="请输入赤经">
          </el-input>
        </el-form-item>
        <el-form-item label="赤纬">
          <el-input v-model="formData.de" placeholder="请输入赤纬"></el-input>
        </el-form-item>
        <el-form-item label="检索半径">
          <el-input v-model="formData.radius" placeholder="请输入检索半径"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </i-col>
    <i-col span="24" v-if="">
      <el-table ref="table" :data="currentTableData" @selection-change="selectChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="resName" label="资源名称" align="center"></el-table-column>
        <el-table-column prop="mainName" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="下载" placement="right">
              <i-button type="text" size="small">
                <Icon type="arrow-down-a" size="20"></Icon>
              </i-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </i-col>
  </Row>
</template>
<script>
  //  import { sites } from '../util/siteinfo'
  import { scsSearch } from '../../api/httpmethods'

  export default {
    name: 'sitemanage',
    mounted () {

    },
    data () {
      return {
        formData: {
          ra: '',
          de: '',
          radius: ''
        },
        currentTableData: []
      }
    },
    methods: {
      onSubmit () {
        scsSearch({
          ra: this.formData.ra,
          de: this.formData.de,
          radius: this.formData.radius
        }).then(res => {
          console.log(res)
        })
      },
      selectChange () {

      }
    }
  }
</script>
<style scoped>

</style>
