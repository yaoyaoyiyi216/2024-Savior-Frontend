import fetch from '@/config/fetch'
// 登录
export const login = (data = {}) => {
  return fetch('/login', {
    method: "post",
    data: data
  })
}
// 获取验证码 
export const loginRegettestcode = (data = {}) => {
  return fetch('/login/regettestcode', {
    method: "post",
    data: data
  })
}
// 验证验证码
export const loginNext = (data = {}) => {
  return fetch('/login/next', {
    method: "post",
    data: data
  })
}
// 重新设置密码
export const resetpassword = (data = {}) => {
  return fetch('/login/resetpassword', {
    method: "post",
    data: data
  })
}