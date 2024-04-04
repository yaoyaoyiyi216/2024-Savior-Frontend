import fetch from '@/config/fetch'
// 仓库展示动物
export const getStoreAniminial = (data = {}) => {
  return fetch('/home/animinial', {
    method: "get",
    data: data
  })
}
// 仓库展示植物
export const getStorePlants = (data = {}) => {
  return fetch('/home/plants', {
    method: "get",
    data: data
  })
}
// 仓库展示污染物
export const getStoreBadBuildings = (data = {}) => {
  return fetch('/home/badbuildings', {
    method: "get",
    data: data
  })
}
// 仓库展示建筑物
export const getStoreBuildings = (data = {}) => {
  return fetch('/home/buildings', {
    method: "get",
    data: data
  })
}
// 仓库升级建筑物
export const upStoreBuildings = (data = {}) => {
  return fetch('/home/buildings', {
    method: "post",
    data: data
  })
}
// 仓库展示动物-放置版本
export const funcPlaceAniminal = (data = {}) => {
  return fetch('/funcplaceaniminal', {
    method: "get",
    data: data
  })
}
// 仓库展示植物-放置版本
export const funcPlacePlant = (data = {}) => {
  return fetch('/funcplaceplant', {
    method: "get",
    data: data
  })
}
