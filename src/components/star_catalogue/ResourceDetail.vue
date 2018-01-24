<template>
  <el-row type="flex" jusitfy="center">
    <el-col :span="24">
      <div style="float: left">
        <h2>站点：{{siteName}}</h2>
      </div>
      <div style="float: right">
        <el-select size="large" v-model="search" filterable placeholder="请输入要查找的文件名" :clearable="true"
                   @change="changeFilterData" @clear="clearFilterData"
                   style="width: 30rem">
          <el-option
            v-for="(item,index) in filterData"
            :key="index"
            :label="item.resName"
            :value="index">
          </el-option>
        </el-select>
      </div>
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
      <div style="margin: 10px;overflow: hidden">
        <div style="float: left;">
          <el-tooltip effect="dark" content="删除后将不可恢复，请谨慎操作" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="small" :disabled="isDelete" @click="deleteFile">删除
            </el-button>
          </el-tooltip>
        </div>
        <div style="float: right;">
          <el-pagination layout="total,prev, pager, next" :page-size="pageSize" :current-page.sync="currentPage"
                         :total="tableData.length" @current-change="changePage"></el-pagination>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { getTodoSiteDetail, deleteFile } from '../../api/httpmethods'
  import { fileTypeName } from '../util/util'

  export default {
    name: 'app',
    mounted () {
      if (this.$store.state.sitesInfo.length === 0) {
//        假如站点信息为空 重新请求
        this.$store.dispatch('getSiteInfo').then(() => {
          this.getResourceDetail()
        })
      } else {
        this.getResourceDetail()
      }
    },
    data () {
      return {
        selectedSitesInfo: [],
        search: '',
        siteName: '',
        tableData: [],
        currentTableData: [],
        pageSize: 10,
        currentPage: 1,
        filterData: []
      }
    },
    computed: {
      isDelete () {
        return this.selectedSitesInfo.length === 0
      }
    },
    methods: {
      changeFilterData (param) {
        this.tableData.splice(0, this.tableData.length)
        this.tableData.push(this.filterData[param])
        this.currentTableData = [...this.getCurrentTableData()]
      },
      clearFilterData () {
        this.tableData.splice(0, this.tableData.length)
        this.tableData = [...JSON.parse(JSON.stringify(this.filterData))]
        this.currentTableData = [...this.getCurrentTableData()]
      },
      getResourceDetail () {
        let index = Number(this.$route.query.index)
//        console.log(this.$store.state.sitesInfo[index])
        let self = this
        getTodoSiteDetail({
          detail: this.$store.state.sitesInfo[index]
        }).then((res) => {
//          console.log(res)
          let fileNames = res.data.data
          this.siteName = this.$store.state.sitesInfo[index].address
          self.tableData.splice(0, this.tableData.length)
          fileNames.forEach(item => {
            self.tableData.push({
              resName: item,
              mainType: this.$store.state.sitesInfo[index].mainType,
              mainName: fileTypeName[this.$store.state.sitesInfo[index].mainType]
            })
          })
          this.filterData = JSON.parse(JSON.stringify(self.tableData))
          this.currentTableData = [...this.getCurrentTableData()]
        })
      },
      selectChange (param) {
//        console.log(param)
        this.selectedSitesInfo.splice(0, this.selectedSitesInfo.length)
        this.selectedSitesInfo = [...param]
      },
      getCurrentTableData () {
        return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      },
      changePage (value) {
        this.currentPage = value
        this.currentTableData.splice(0, this.currentTableData.length)
        this.currentTableData = [...this.getCurrentTableData()]
      },
      deleteFile () {
        new Promise((resolve, reject) => {
          deleteFile({
            siteName: this.siteName,
            files: this.selectedSitesInfo
          }).then((res) => {
            console.log(res)
            let data = res.data
            if (data.status === 'SUCCESS') {
              this.$message.error(data.message)
              resolve()
            } else if (data.status === 'ERROR') {

            }
          })
        }).then(() => {
          this.getResourceDetail()
        })
      }
    }
  }
</script>
<style scoped>
  h3 {
    text-align: left;
  }
</style>
