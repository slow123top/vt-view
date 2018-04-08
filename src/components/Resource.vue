<template>
    <Row type="flex" jusitfy="center">
      <i-col :span="spanLeft" class="left">
        <el-menu class="left-menu" default-active="1-4-1" :collapse="isCollapse"
                 background-color="#545c64"
                 text-color="#fff" active-text-color="#ffd04b" @select="changeIndex">
          <el-menu-item index="resource-summary">
            <i class="el-icon-location"></i>
            <span slot="title">资源总表</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>星表检索</span>
            </template>
            <el-menu-item index="search-global">
              <i class="el-icon-search"></i>
              <span>组合检索</span>
            </el-menu-item>
            <el-menu-item index="search-scs">
              <i class="el-icon-search"></i>
              <span>锥形检索</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>站点管理</span>
            </template>
            <el-menu-item index="status-listen">
              <i class="el-icon-search"></i>
              <span>状态监听</span>
            </el-menu-item>
            <el-menu-item index="file-upload">
              <i class="el-icon-search"></i>
              <span>文件上传</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </i-col>
      <i-col :span="spanRight">
        <right-header @toggleClick="toggle"></right-header>
        <Row type="flex" jusitfy="center">
          <i-col :span="24" class="main-right-bottom">
            <router-view></router-view>
          </i-col>
        </Row>
      </i-col>
    </Row>
</template>

<script>
  /* eslint-disable no-trailing-spaces */

  import { getRemoteReqTodo, checkToken } from '../api/httpmethods'
  import RightHeader from './RightHeader.vue'

  export default {
    name: 'hello',
    beforeCreate () {
//      主页刷新时，如果服务器设置的token时效到了   就会给出重新登录的提示
      checkToken().then(res => {
        if (res.data.error) {
          this.$store.dispatch('logout')
          this.$message.error(res.data.error)
          return false
        } else {
          this.$store.dispatch('login', {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token')
          })
        }
      }).catch(e => {
        this.$message.error(e)
        return false
      })
    },
    mounted () {
      console.log(this.$store.state.userType)
    },
    data () {
      return {
        isCollapse: false,
        spanLeft: 3,
        spanRight: 21
      }
    },
    methods: {
      httpGet () {
        getRemoteReqTodo('/users', [], [])
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
      },
      changeIndex (index) {
        switch (index) {
          case 'resource-summary':
            this.$router.push('/resource/foo/summary')
            break
          case 'status-listen':
            this.$router.push('/resource/foo/sitemanage')
            break
          case 'search-global':
            this.$router.push('/resource/foo/global')
            break
          case 'search-scs':
            this.$router.push('/resource/foo/scs')
            break
          case 'file-upload':
            this.$router.push('/resource/foo/upload')
            break
          default:
            break
        }
      },
      toggle (data) {
        if (this.spanLeft === 3) {
          this.isCollapse = data[0][0]
          this.spanLeft = data[0][1]
          this.spanRight = data[0][2]
        } else {
          this.isCollapse = data[1][0]
          this.spanLeft = data[1][1]
          this.spanRight = data[1][2]
        }
      }

    },
    components: {
      RightHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left {
    /*height: 53rem;*/
    /*background-color: #545c64;*/
  }

  .left-menu {
    height: 50rem;

  }

  .main-right-bottom {
    padding: 1rem;
    background-color: #f0f0f0;
  }

  .main-body {
    width: 100%;
    padding: 1rem;
  }

</style>
