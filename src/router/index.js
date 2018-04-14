import Vue from 'vue'
import Router from 'vue-router'
import Resource from '@/components/Resource'
import ResourceSummary from '@/components/star_catalogue/ResourceSummary'
import ResourceDetail from '@/components/star_catalogue/ResourceDetail'
import Upload from '@/components/star_catalogue/Upload'
import SiteManage from '@/components/site/SiteManage'
import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Scs from '@/components/star_search/Scs'
import Global from '@/components/star_search/Global'
// 普通用户
import CommonResource from '@/components/common/resource'
import Person from '@/components/common/person'
import Index from '@/components/index'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/resource/:id',
      name: 'resource',
      // redirect: {
      //   path: '/resource/foo'
      // },
      meta: {
        requireAuth: true // 添加该字段，表示进入这个此路由是需要登录的
      },
      component: Resource,
      children: [
        {
          path: 'summary',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个此路由是需要登录的
          },
          name: 'ResourceSummary',
          component: ResourceSummary
        },
        {
          path: 'detail',
          name: 'ResourceDetail',
          component: ResourceDetail
        },
        {
          path: 'sitemanage',
          name: 'SiteManage',
          component: SiteManage
        },
        {
          path: 'global',
          name: 'global',
          component: Global
        },
        {
          path: 'scs',
          name: 'scs',
          component: Scs
        },
        {
          path: 'upload',
          name: 'upload',
          component: Upload
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/common/:id',
      name: 'commonresource',
      component: CommonResource,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个此路由是需要登录的
      },
      children: [
        {
          path: 'summary',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个此路由是需要登录的
          },
          name: 'ResourceSummary',
          component: ResourceSummary
        },
        {
          path: 'person',
          name: 'commonperson',
          component: Person
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
