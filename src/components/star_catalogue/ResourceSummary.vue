<template>
  <el-row type="flex" jusitfy="center">
    <el-col :span="24">
      <el-table :data="currentTableData">
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="mainType" label="主类" align="center"></el-table-column>
        <el-table-column prop="subType" label="次类" align="center"></el-table-column>
        <el-table-column prop="address" label="站点" align="center">
          <template slot-scope="scope">
            <router-link to="/resource/foo/sitemanage">
              {{scope.row.address}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="mainName" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="{path:'/resource/foo/detail',query:{index:scope.$index+(currentPage - 1) * pageSize}}"
                         target="_blank">
              文件详情
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <el-pagination layout="total,prev, pager, next" :page-size="pageSize" :current-page.sync="currentPage"
                         :total="tableData.length" @current-change="changePage"></el-pagination>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'app',
    mounted () {
//      使用new Promise的好处
      this.$store.dispatch('getSiteInfo').then(() => {
        this.tableData = [...this.$store.state.sitesInfo]
        this.currentTableData = [...this.getCurrentTableData()]
      }).catch(e => {
        this.$message.error(e)
      })
    },
    data () {
      return {
        tableData: [],
        currentTableData: [],
        pageSize: 15,
        currentPage: 1
      }
    },
    methods: {
      getTableData () {
//        let self = this
//        getRemoteReqTodo('/summary', [], [])
//          .then(res => {
//            let data = res.data
//            data.forEach(items => {
//              items['data']['fileType'].forEach(item => {
//                self.tableData.push(item)
//              })
//            })
//            self.tableData.forEach(item => {
//              if (item['mainType'] === '1') {
//                item['mainName'] = '星表文件'
//              } else if (item['mainType'] === '2') {
//                item['mainName'] = '天文文献'
//              } else {
//                item['mainName'] = '光谱文件'
//              }
//            })
//            self.currentTableData = self.getCurrentTableData()
//          })
//          .catch(e => {
//            console.log(e)
//          })
      },
      getCurrentTableData () {
        return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      },
      changePage (value) {
        this.currentPage = value
        this.currentTableData.splice(0, this.currentTableData.length)
        this.currentTableData = [...this.getCurrentTableData()]
      }
    }
  }
</script>
<style>
</style>
