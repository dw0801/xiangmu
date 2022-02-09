// 获取品牌管理数据
import request from '@/utils/request'
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`
})

// 新增品牌 /admin/product/baseTrademark/save
// 修改品牌 /admin/product/baseTrademark/update
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    return request({
      url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark
    })
  }
}

// 删除品牌 /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete'
  })
}
