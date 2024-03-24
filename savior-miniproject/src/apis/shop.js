import ajax from "@/config/axios.config.js";
// 抽奖
export const choujiang = (data = {}) => {
  return ajax({
    type: "post",
    url: '/shop/choujiang',
    data: data
  })
}
// 商店展示动物
export const getStopAniminial = (data = {}) => {
  return ajax({
    type: "get",
    url: '/shop/animinial',
    data: data
  })
}
// 商店展示植物
export const getStopPlants = (data = {}) => {
  return ajax({
    type: "get",
    url: '/shop/plants',
    data: data
  })
}
// 商店展示建筑物
export const getStopBuildings = (data = {}) => {
  return ajax({
    type: "get",
    url: '/shop/buildings',
    data: data
  })
}