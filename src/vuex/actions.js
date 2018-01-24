import * as types from './mutation-types'
import { getTodoSiteInfo } from '../api/httpmethods'

const actions = {
  getSiteInfo ({commit}) {
    return new Promise((resolve, reject) => {
      getTodoSiteInfo().then(res => {
        if (res.data['status'] === 'ERROR') {
          reject(res.data['message'])
        } else {
          console.log(res.data)
          commit(types.SITEDETAIL, {data: res.data})
          resolve()
        }
      })
    })
  },
  login ({commit}, data) {
    commit(types.LOGIN, data)
  },
  logout ({commit}) {
    commit(types.LOGOUT)
  }
}
export default actions
