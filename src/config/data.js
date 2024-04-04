// 全局信息放这里
const globalData = {  
  // baseUrlPrefix: 'http://127.0.0.1:4523/m1/3942934-0-default', 
  baseUrlPrefix: 'http://101.201.225.117:8081', 
  token: "", // token
  isLogin: '', // "0" 未登录; "1" 已登录; "" 默认空
  userInfo: {}, // 用户信息
  starInfo: {
    starName: '',  // 星球名字
    energy: '', // 剩余能量
  }
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
