import fetch from '@/config/fetch'
// 游戏成功
export const gameSuccess = (data = {}) => {
  return fetch('/planet/game', {
    method: "post",
    data: data
  })
}