import ajax from "@/config/axios.config.js";
// 登录
export const login = (data = {}) => {
  return ajax({
    type: "post",
    url: '/login',
    data: data
  })
}
// 获取验证码
export const loginRegettestcode = (data = {}) => {
  return ajax({
    type: "post",
    url: '/login/regettestcode',
    data: data
  })
}
// 验证验证码
export const loginNext = (data = {}) => {
  return ajax({
    type: "post",
    url: '/login/next',
    data: data
  })
}