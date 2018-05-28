<template>
  <div class="common">
    <Row type="flex" justify="center" class="common-resource-header">
      <i-col :span="3" class="common-header">

      </i-col>
      <i-col :span="10" class="common-header">
        <el-menu class="left-menu" default-active="1-4-1"
                 mode="horizontal"
                 text-color="#909090" active-text-color="#409eff">
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
      <i-col :span="3" class="common-right-top">

        <Dropdown trigger="click" class="common-right-top-dropdown" @on-click="selectPersonAttr">
          <a href="javascript:void(0)">
            <Avatar :src="$store.state.avatarAddr"/>
            <span class="common-user-name">{{ $store.state.username }}</span>
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="person-center">个人中心</DropdownItem>
            <DropdownItem name="person-logout" divided>退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </i-col>
    </Row>
    <Row type="flex" justify="center" class="common-resource-header">
      <i-col :span="10">
        <router-view></router-view>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import { checkToken, getUserInfo } from '../../api/httpmethods'

  export default {
    name: 'resource',
    beforeCreate () {
//      主页刷新时，如果服务器设置的token时效到了   就会给出重新登录的提示
      new Promise((resolve, reject) => {
        checkToken().then(res => {
          if (res.data.error) {
            this.$store.dispatch('logout')
            this.$message.error(res.data.error)
            return false
          } else {
            resolve()
          }
        })
      }).then(() => {
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
      })
        .catch(e => {
          this.$message.error(e)
          return false
        })
    },
    data () {
      return {}
    },
    methods: {
      selectPersonAttr (value) {
        switch (value) {
          case 'person-center':
            this.$router.push('/common/foo/person')
            break
          default:
            break
        }
      }
    }
  }
</script>

<style scoped>
  .common-right-top {
    /*height: 5rem;*/
    /*padding: 1rem;*/
    background-color: #fff;
    /*border-bottom: 1px solid rgb(228, 234, 241);*/
    text-align: center;
  }

  .common-user-name {
    display: inline-block;
    width: 80px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
    line-height: 3.5rem;
  }

  .common-right-top-dropdown {
    /*margin-left: 85%;*/
    font-size: 1rem;
  }

  .common-resource-header {
    border-radius: 5px;
    /*margin-bottom: .5rem;*/
  }

  .common-resource-header:first-child {
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
  }

  .common {
    background-color: #f0f0f8;
    height: 960px;
  }
</style>
