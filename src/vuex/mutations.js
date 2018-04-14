import * as types from './mutation-types'

const mutations = {
  [types.LOGIN] (state, payload) {
    //  登录成功  客户端保存token
    localStorage.setItem('token', payload.token)
    localStorage.setItem('username', payload.username)
    state.token = payload.token
    state.username = payload.username
    state.userType = payload.userType
    state.avatarAddr = payload.avatarAddr
    state.introduction = payload.introduction
    state.career = payload.career
  },
  [types.LOGOUT] (state, payload) {
    localStorage.removeItem('token')
    state.token = null
    localStorage.removeItem('username')
    state.username = null
  },
  [types.SITEDETAIL] (state, payload) {
    let data = payload.data['data']
    let temp = []
    data.forEach(items => {
      items['data'].forEach(item => {
        temp.push(item)
      })
    })
    temp.forEach(item => {
      if (item['mainType'] === '1') {
        item['mainName'] = '星表文件'
      } else if (item['mainType'] === '2') {
        item['mainName'] = '天文文献'
      } else {
        item['mainName'] = '光谱文件'
      }
    })
    state.sitesInfo = [...temp]
  }
}
export default mutations
