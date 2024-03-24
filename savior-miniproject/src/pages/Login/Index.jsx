import Taro, { login } from '@tarojs/taro';
import { useState } from 'react';
import { View, Text, Button, Checkbox } from '@tarojs/components';
import InputField from '../../Components/InputField';
import ActionButton from '../../Components/ActionButton';
import './Login.css';
import SignupButton from './components/SignupButton';
import LoginButton from './components/LoginButton';
import { setGlobalData } from '@/config/data'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({
      username: email,
      password: password
    }).then(res => {
      console.log(res)
      // 后端返回：重定向，data_1是/planet，data_2是token 
      // 此处的code表示成功必须是统一的，后续根据具体返回值自己改动
      if (res.code === 10000) {
        // 将token存到本地
        Taro.setStorageSync({
          key: 'token',
          data: res.data_2 // 真SB
        })
        // 将token存到全局数据中
        setGlobalData('token', res.data_2)
        // 跳转到首页
        Taro.navigateTo({
          url: '/pages/Home/Index'
        })
      }
    }).catch(err => {
      console.log(err)
    })
    // try {
    //   if (response.ok) {
    //     Taro.showToast({
    //       title: '登陆成功',
    //       icon: 'success',
    //       duration: 2000,
    //     });
    //     Taro.navigateTo({
    //       url: '/pages/Home/Index'
    //     })
    //   } else {

    //     Taro.showToast({
    //       title: '登陆失败,请检查qq邮箱号和密码',
    //       icon: 'none',
    //       duration: 2000,
    //     });
    //   }
    // } catch (error) {
    //   console.error('登陆失败:', error);
    //   Taro.showToast({
    //     title: '登陆失败，请稍后重试',
    //     icon: 'none',
    //     duration: 2000,
    //   });
    // }
  };

  return (
    <View className='body'>
      <SignupButton />
      <LoginButton />
      <View>
        
        <InputField
          className='email'
          type='text'
          placeholder=' 请输入QQ邮箱号'
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
      </View>
      <View>
        
        <InputField
          className='password'
          type='password'
          placeholder=' 请输入密码'
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
      </View>
      <ActionButton 
      className='login'
      text='立即登录'
      onClick={handleLogin}></ActionButton>
      <Text className='occlusion'>.</Text>
    </View>
  );
}

export default Login;
