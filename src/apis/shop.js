import fetch from '@/config/fetch'
// 抽奖
export const choujiang = (data = {}) => {
  return fetch('/shop/choujiang', {
    method: "post",
    data: data
  })
}
// 商店展示动物
export const getStopAniminial = (data = {}) => {
  return fetch('/shop/animinial', {
    method: "get",
    data: data
  })
}
// 商店展示植物
export const getStopPlants = (data = {}) => {
  return fetch('/shop/plants', {
    method: "get",
    data: data
  })
}
// 商店展示建筑物
export const getStopBuildings = (data = {}) => {
  return fetch('/shop/buildings', {
    method: "get",
    data: data
  })
}
// 商店购买动物
export const buyStopAniminial = (data = {}) => {
  return fetch('/shop/animinial/buy', {
    method: "post",
    data: data
  })
}
// 商店购买植物
export const buyStopPlant = (data = {}) => {
  return fetch('/shop/plant/buy', {
    method: "post",
    data: data
  })
}
// 商店购买建筑物
export const buyStopBuilding = (data = {}) => {
  return fetch('/shop/building/buy', {
    method: "post",
    data: data
  })
}