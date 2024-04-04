import Taro from '@tarojs/taro';
import { useState } from 'react';
import { View, Input, Image} from '@tarojs/components';
import './Name.css';
import { plantName } from '@/apis/name'
import { getGlobalData, setGlobalData } from '@/config/data'

const Name = () => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = () => {
    if (!name) {
      Taro.showToast({
        title: "请输入星球名！",
        icon: "none"
      });
      return;
    }
    plantName({
      planetname: name
    }).then(res => {
      if (res.code === 40000) {
        // 保存星球名字到全局
        setGlobalData('starInfo', Object.assign({}, getGlobalData('starInfo', { starName: name })))
        Taro.showToast({
          title: "命名成功！",
          icon: "none",
        });
        // 将token存到本地
        Taro.setStorageSync('token', res.data_2)
        Taro.setStorageSync('isLogin', '1')
        // 将token存到全局数据中
        setGlobalData('token', res.data_2)
        setGlobalData('isLogin', '1')
        setTimeout(() => {
          Taro.reLaunch({
          
            url: '/pages/Home/Index'
          })
        }, 600)
      } else {
        Taro.showToast({
          title: res.msg || "命名失败！",
          icon: "none"
        })
      }
    }).catch(err => {
      console.log(err)
      Taro.showToast({
        title: res.msg || "命名失败！",
        icon: "none"
      })
    })
  }

  return (
    <View className='body'>
      
      <Input
        className='textinput'
        type='text'
        
        value={name}
        onInput={handleNameChange}
      />
      <Image 
        src={require('@/assets/pictures/name/arrow.png')}
      className='arrow'
      onClick={handleSubmit}></Image> 
    </View>
  )
}

export default Name;


