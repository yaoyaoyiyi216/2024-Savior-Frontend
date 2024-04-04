import fetch from '@/config/fetch'
// 星球命名
export const plantName = (data = {}) => {
  return fetch('/planet/name', {
    method: "post",
    data: data
  })
}