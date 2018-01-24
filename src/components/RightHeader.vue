<template>
  <Row type="flex" jusitfy="center">
    <i-col :span="24" class="main-right-top">
      <i-button type="text" @click="toggleClick">
        <Icon type="navicon" size="32"></Icon>
      </i-button>
      <!--<Row type="flex" justify="end" class="user-dropdown-innercon">-->
      <!--<i-col span="1">-->
      <Dropdown trigger="click" class="main-right-top-dropdown">
        <a href="javascript:void(0)">
          <span class="main-user-name">{{ $store.state.username }}</span>
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="ownSpace">个人中心</DropdownItem>
          <DropdownItem name="loginout" divided>退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <!--</i-col>-->
      <!--</Row>-->
    </i-col>
  </Row>
</template>
<script>
  export default {
    name: 'rightHeader',
    data () {
      return {}
    },
    methods: {
      toggleClick () {
        this.$emit('toggleClick', [[true, 1, 23], [false, 3, 21]])
      }
    }
  }
</script>
<style scoped>
  .main-right-top {
    height: 5rem;
    padding: .5rem;
    background-color: #fff;
    border-bottom: 1px solid rgb(228, 234, 241);
    text-align: left;
  }

  .main-user-name {
    display: inline-block;
    width: 80px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }

  .main-right-top-dropdown {
    margin-left: 85%;
    font-size: 1rem;
  }
</style>
