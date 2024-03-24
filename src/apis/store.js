import ajax from "@/config/axios.config.js";

// 仓库展示动物
export const getStoreAniminial = (data = {}) => {
  return ajax({
    type: "get",
    url: '/home/animinial',
    data: data
  })
}
// 仓库展示植物
export const getStorePlants = (data = {}) => {
  return ajax({
    type: "get",
    url: '/home/plants',
    data: data
  })
}
// 仓库展示建筑物
export const getStoreBuildings = (data = {}) => {
  return ajax({
    type: "get",
    url: '/home/buildings',
    data: data
  })
}
// 仓库升级建筑物
export const upStoreBuildings = (data = {}) => {
  return ajax({
    type: "post",
    url: '/home/buildings',
    data: data
  })
}