// 全局信息放这里
const globalData = {
  baseUrlPrefix: 'http://127.0.0.1:4523/m1/4197523-0-default', // 请求地址 后端部署后修改这里
  token: "", // token
  user_info: {}, // 用户信息
}

const setGlobalData = (key, value) => {
  globalData[key] = value
}

const getGlobalData = (key) => {
  return globalData[key]
}

export {
  getGlobalData,
  setGlobalData
}
