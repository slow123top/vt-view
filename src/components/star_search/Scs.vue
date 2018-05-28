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
        <el-table-column prop="HIP" label="HIP" align="center"></el-table-column>
        <el-table-column prop="TYC2" label="TYC2" align="center"></el-table-column>
        <el-table-column prop="SolID" label="SolID" align="center"></el-table-column>
        <el-table-column prop="Source" label="Source" align="center"></el-table-column>
        <el-table-column prop="DEdeg" label="DEdeg" align="center"></el-table-column>
        <el-table-column prop="RAdeg" label="RAdeg" align="center"></el-table-column>
      </el-table>
    </i-col>
  </Row>
</template>
<script>
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
          this.currentTableData = res.data.data
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
