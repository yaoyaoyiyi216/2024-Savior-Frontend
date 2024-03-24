import ajax from "@/config/axios.config.js";
// 放置动物
export const placeAniminal = (data = {}) => {
  return ajax({
    type: "post",
    url: '/mainland/place/animinal',
    data: data
  })
}
// 放置植物
export const placePlant = (data = {}) => {
  return ajax({
    type: "post",
    url: '/mainland/place/plant',
    data: data
  })
}