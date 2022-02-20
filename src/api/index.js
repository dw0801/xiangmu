import * as trademark from './product/tradeMark'
import * as attr from './product/attr'
import * as spu from './product/spu'
import * as sku from './product/sku'
// 引入权限管理的接口
import * as user from './acl/user'
import role from './acl/role'
// 上面两个不同的引入   是因为文件里面对外暴露不一样   一个是export 用第第一种引入 一个是 export default 默认暴露 用第二种引入
import permission from './acl/permission'
export default {
  trademark,
  attr,
  spu,
  sku,
  user,
  role,
  permission
}
