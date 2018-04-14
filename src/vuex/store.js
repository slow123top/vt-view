import Vue from 'vue'
import Vuex from 'vuex'
// import * as state from './state'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
const state = {
  sitesInfo: [],
  token: null,
  username: localStorage.getItem('username'),
  userType: '1',
  avatarAddr: '',
  career: '',
  introduction: ''
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
