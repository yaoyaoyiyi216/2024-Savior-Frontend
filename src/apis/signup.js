import fetch from '@/config/fetch'
// 发送验证码
export const signupSendcode = (data = {}) => {
  return fetch('/signup/sendcode', {
    method: "post",
    data: data
  })
}
// 验证验证码并注册
export const signup = (data = {}) => {
  return fetch('/signup', {
    method: "post",
    data: data
  })
}
// 验证验证码成功后设置密码
export const signupSetPwd = (data = {}) => {
  return fetch('/signup/getpassword', {
    method: "post",
    data: data
  })
}