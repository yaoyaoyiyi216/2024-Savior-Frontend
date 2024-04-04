// request.js  
import Taro from '@tarojs/taro';
import { getGlobalData } from './data.js';  
  
export default function fetch(url, options = {}) {  
  const defaultOptions = {  
    method: 'GET',  
    header: {
      "content-type": "application/json;charset=utf-8",
      // 'authorization': getGlobalData('token') || Taro.getStorageSync('token'),
      'token': getGlobalData('token') || Taro.getStorageSync('token'),
    },  
    dataType: 'json', // 期望服务器返回的数据类型  
    // credentials: 'include',
  };  
  
  const mergedOptions = { ...defaultOptions, ...options };  
  
  // 如果请求方法为 POST、PUT 或 PATCH，并且请求体是对象，则转为 JSON 字符串  
  if (['POST', 'PUT', 'PATCH'].includes(mergedOptions.method) && typeof mergedOptions.data === 'object' && !Array.isArray(mergedOptions.data)) {  
    mergedOptions.data = JSON.stringify(mergedOptions.data);  
    // 在 header 中指定发送的是 JSON 格式数据  
    mergedOptions.header['content-type'] = 'application/json';  
  }  
  
  // 拼接完整的 URL  
  const fullUrl = getGlobalData('baseUrlPrefix') + url;  
  
  return new Promise((resolve, reject) => {  
    Taro.request({  
      url: fullUrl,  
      method: mergedOptions.method,  
      data: mergedOptions.data,  
      header: mergedOptions.header,  
      dataType: mergedOptions.dataType,  
      success: function (res) {  
        // 请求成功处理  
        if (res.statusCode >= 200 && res.statusCode < 400) {  
          resolve(res.data);  
        } else {  
          reject(new Error(`HTTP error! status: ${res.statusCode}`));  
        }  
      },  
      fail: function (error) {  
        // 请求失败处理  
        reject(error);  
      },  
    });  
  });  
}