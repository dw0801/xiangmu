import request from '@/utils/request'

// 一级分类请求接口
// /admin/product/getCategory1
export const reqCategory1List = () => request({ url: '/admin/product/getCategory1', method: 'get' })

// 二级分类请求接口 /admin/product/getCategory2/{category1Id}
// /admin/product/getCategory1
export const reqCategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })

// 三级分类请求接口 /admin/product/getCategory3/{category2Id}
// /admin/product/getCategory1
export const reqCategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id} `, method: 'get' })

// 获取商品数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGoodsList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// 添加或修改属性和属性值的接口 /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data) => request({ url: '/admin/product/saveAttrInfo', method: 'post', data })
// 删除属性和属性值的接口 /admin/product/deleteAttr/{attrId}
export const reqDeleteAttr = (attrId) => request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'delete', attrId })
// 获得属性和属性值的接口 /admin/product/getAttrValueList/{attrId}
