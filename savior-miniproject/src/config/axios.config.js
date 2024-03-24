// 封装Taro请求
import Taro from '@tarojs/taro'
import { getGlobalData } from './data.js'

const ajax = (ajaxData, loading = true) => {

  return new Promise((resolve, reject) => {
    if (loading) {
      Taro.showLoading({
        title: "正在加载..."
      });
    }
    Taro.request({
      url: getGlobalData('baseUrlPrefix') + ajaxData.url,
      data: ajaxData.data || {},
      method: ajaxData.type || 'get',
      header: {
        "content-type": "application/json;charset=utf-8",
        'authorization': getGlobalData('token') || Taro.getStorageSync('token'),
        'token': getGlobalData('token') || Taro.getStorageSync('token'),
      },
      success: res => {
        console.log("从接口获取到的数据", res);
        Taro.hideLoading();
        if (res.statusCode === 200) {
          Taro.hideLoading();
          resolve(res.data);
        } else {
          Taro.hideLoading();
          Taro.showToast({
            title: "数据请求错误",
            icon: "none"
          });
        }
      },
      fail(err) {
        Taro.hideLoading();
        reject("接口有误，请检查");
      }
    });
  });
};
export default ajax
