import fetch from '@/config/fetch'
// 意见反馈
export const feedback = (data = {}) => {
  return fetch('/planet/fankui', {
    method: "post",
    data: data
  })
}
// 星球主页面-首页
export const getPlanetInfo = (data = {}) => {
  return fetch('/planet', {
    method: "get",
    data: data
  })
}