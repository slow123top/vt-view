<template>
  <Avatar :src="avatarSrc" :size="avatarSize" :style="avatarStyle"/>
</template>

<script>
  export default {
    name: 'avatar',
    props: {
      avatarSrc: {
        type: String,
        default: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
      },
      avatarSize: {
        type: String,
        default: 'large'
      },
      avatarStyle: {
        type: Object,
        default: function () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

</style>
