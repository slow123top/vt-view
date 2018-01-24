<template>
  <Row type="flex" justify="start">
    <i-col :span="7" class="card-site" v-for="(item,index) in sites" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{item}}</span>
          <el-button type="primary" size="small" @click="startSite(item)">重启</el-button>
          <!--<el-button type="danger" size="small">关闭</el-button>-->
        </div>
        <div>
          状态：<span class="card-status">{{sitesStatus[index]}}</span>
        </div>
      </el-card>
    </i-col>
  </Row>
</template>
<script>
  import { sites } from '../util/siteinfo'
  import { startSite } from '../../api/httpmethods'

  export default {
    name: 'sitemanage',
    mounted () {
//       let self = this
//       listenSite({
//         sites: sites
//       }).then(res => {
// //        console.log(res)
//         res.data.forEach(item => {
//           self.sitesStatus.push(item['data']['stationStatus'])
//         })
//       })
    },
    data () {
      return {
        siteName_1: sites[0],
        siteName_2: sites[1],
        siteName_3: sites[2],
        siteName_4: sites[3],
        siteName_5: sites[4],
        sites: sites,
        sitesStatus: []
      }
    },
    methods: {
      startSite (param) {
        startSite({
          site: param
        }).then(res => {
          this.$message.success(res)
        })
      }
    }
  }
</script>
<style scoped>
  .clearfix {
    text-align: right;
  }

  .card-site {
    margin-right: 2rem;
    margin-top: 1rem
  }

  .card-status {
    font-size: 1.2rem;
    font-weight: bold;
    color: #FA5555;
  }

  .clearfix > span {
    font-size: 1rem;
    margin-right: 5rem;
  }

</style>
