import axios from 'axios'
import qs from 'qs'
import router from '@/router'

function toQs (param) {
  return qs.stringify(param)
}

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'http://219.231.164.34:8083',
  // baseURL: '',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    // 'Access-Control-Allow-Origin': '*'
  },
  // withCredentials: true,
  timeout: 30000
})
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  config => {
//  判断localstorage是否存在token 如果存在  则为每一个http header 都加上一个token   方便后端服务程序确认
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `token ${localStorage.getItem('token')}`
    } else {
      router.replace({
        path: '/login'
        // query: {
        //   redirect: router.currentRoute.fullPath
        // }
      })
    }
    // console.log(config)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
//  判断响应数据中是否含有token
    if (response.data.hasOwnProperty('token')) {
      if (!response.data.token) {
        router.replace({
          path: '/login'
          // query: {
          //   redirect: router.currentRoute.fullPath
          // }
        })
      }
    }
    return response
  },
  err => {
    return Promise.reject(err)
  }
)
export const postRemoteReqTodo = (url, params) => {
  return axiosInstance.post(url + '?a=' + Math.random(), toQs(params))
}
export const getRemoteReqTodo = (url, params, values) => {
  if (params.length !== 0) {
    let a = ''
    for (let i = 0; i < params.length; i++) {
      a = a + '&' + params[i] + '=' + values[i]
    }
    return axiosInstance.get(url + '?a=' + Math.random() + '&' + a.substring(1))
  }
  return axiosInstance.get(url + '?a=' + Math.random())
}
export const getTodoSiteInfo = () => {
  return getRemoteReqTodo('/summary', [], [])
}
export const getTodoSiteDetail = param => {
  return postRemoteReqTodo('/detail', param)
}
// 登录
export const login = (param) => {
  return postRemoteReqTodo('/login', param)
}
// 检验token是否过期
export const checkToken = () => {
  return getRemoteReqTodo('/check', [], [])
}
// 获取用户信息 用户名 用户类型  头像 职业  个人介绍等
export const getUserInfo = (param) => {
  return postRemoteReqTodo('/getUserInfo', param)
}
// 注册
export const register = (param) => {
  return postRemoteReqTodo('/register', param)
}
// 校验用户是否存在
export const validateUsername = (param) => {
  return postRemoteReqTodo('/validateUsername', param)
}
// 监听分支节点状态
export const listenSite = (param) => {
  return postRemoteReqTodo('/sitesStatus', param)
}
// 重启某个站点
export const startSite = (param) => {
  return postRemoteReqTodo('/startSite', param)
}
// 删除某个站点的文件
export const deleteFile = (param) => {
  return postRemoteReqTodo('/delete', param)
}

// 锥形检索
export const scsSearch = (param) => {
  return postRemoteReqTodo('/scs', param)
}
// 全局检索星表信息
export const globalSearch = (params, values) => {
  return getRemoteReqTodo('/global', params, values)
}
