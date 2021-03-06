import mockRequest from '@/utils/mockRequest'

const state = {
  list: {}
}
const mutations = {
  GETDATA(state, list) {
    state.list = list
  }
}
const actions = {
  // 发请求获取首页的mock数据
  async getData({ commit }) {
    const res = await mockRequest.get('/home/list')
    if (res.code === 20000) {
      commit('GETDATA', res.data)
    }
  }
}
export default {
  state,
  mutations,
  actions
}
