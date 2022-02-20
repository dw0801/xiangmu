import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { asyncRoutes, resetRouter, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 服务器返回的菜单信息
    routes: [],
    roles: [],
    buttons: [],
    // 项目中已有的异步路由和服务器返回的菜单对比
    resultAsyncRoutes: [],
    // 用户展示的全部路由
    resultAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    // 用户名
    state.name = userInfo.name
    // 用户头像
    state.avatar = userInfo.avatar
    // 菜单权限标记
    state.routes = userInfo.routes
    // 按钮权限的标记
    state.buttons = userInfo.buttons
    // 角色
    state.roles = userInfo.roles
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  // 最终计算出来的异步路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    // vuex 保存当前计算出的异步路由，还与需要常量路由，任意路由
    state.resultAsyncRoutes = asyncRoutes
    // 计算出当前用户需要展示的所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    // 给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

// 定义一个函数：两个数组进行对比，对比出显示那些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  // 过滤出当前用户需要展示的异步路由
  return asyncRoutes.filter(item => {
    // 数组当中没有这个元素返回索引值-1，如果有这个元素返回的索引值一定不是-1
    if (routes.indexOf(item.name) !== -1) {
      // 用递归筛选二级三级甚至更多级的路由名称
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 获取用户信息：data中包含（用户名name、用户头像avatar、routes[返回的标志：不同的用户展示那些标签]、roles[用户角色信息]、button[按钮的信息：按钮权限用的标记]）
        const { data } = response
        console.log(data)

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // 存储用户全部的信息
        commit('SET_USERINFO', data)
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
