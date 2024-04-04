import fetch from '@/config/fetch'
// 放置动物
export const placeAniminal = (data = {}) => {
  return fetch('/mainland/place/animinal', {
    method: "post",
    data: data
  })
}
// 放置植物
export const placePlant = (data = {}) => {
  return fetch('/mainland/place/plant', {
    method: "post",
    data: data
  })
}
// 净化污染物（拆除建筑物）
export const purifyPlaceBuilding = (data = {}) => {
  return fetch('/place/buildings/chai', {
    method: "post",
    data: data
  })
}
// 获取大陆信息-冰川
export const getMainlandYunluo = (data = {}) => {
  return fetch('/mainland/yunluo', {
    method: "get",
    data: data
  })
}
// 获取大陆信息-山地
export const getMainlandMier = (data = {}) => {
  return fetch('/mainland/mier', {
    method: "get",
    data: data
  })
}
// 获取大陆信息-森林
export const getMainlandXilun = (data = {}) => {
  return fetch('/mainland/xilun', {
    method: "get",
    data: data
  })
}
// 获取大陆信息-沙漠
export const getMainlandKala = (data = {}) => {
  return fetch('/mainland/kala', {
    method: "get",
    data: data
  })
}
// 获取大陆信息-草原
export const getMainlandWulan = (data = {}) => {
  return fetch('/mainland/wulan', {
    method: "get",
    data: data
  })
}
// 获取大陆报告
export const getMainlandReport = (data = {}) => {
  return fetch('/mainland/report', {
    method: "post",
    data: data
  })
}