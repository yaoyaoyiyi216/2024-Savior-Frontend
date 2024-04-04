import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Text, Input, Button, Checkbox } from '@tarojs/components';
import InputField from '../../Components/InputField';
import ActionButton from '../../Components/ActionButton';
import './Login.css';
import SignupButton from './components/SignupButton';
import LoginButton from './components/LoginButton';
import { getGlobalData, setGlobalData } from '@/config/data'
import { Modal } from '@/components';
import { 
  login,
  loginRegettestcode, 
  loginNext, 
  resetpassword 
} from '@/apis/login';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 立即登录
  const handleLogin = () => {
    login({
      username: email,
      password: password
    }).then(res => {
      // 后端返回data_1是/planet，data_2是token
      
      if (res.code === 40000) {
        Taro.showToast({
          title: '登录成功！',
          icon: 'none'
        })
        // 将token存到本地
        Taro.setStorageSync('token', res.data_2)
        Taro.setStorageSync('isLogin', '1')
        // 将token存到全局数据中
        setGlobalData('token', res.data_2)
        setGlobalData('isLogin', '1')
        // 跳转到首页
        setTimeout(() => {
          Taro.navigateTo({
            url: '/pages/Home/Index'
          })
        }, 500)
      } else {
        Taro.showToast({
          title: res.message || "登录失败！",
          icon: "none"
        })
      }
    }).catch(err => {
      console.log(err)
    })
  };
  // ======== 忘记密码 ========
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(1)
  const [isSending, setIsSending] = useState(false) // 是否发送验证码
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPwd: "",
    confirmPwd: ""
  })
  const changeFormData = (key, value) => {
    setFormData(Object.assign({}, formData, { [key]: value }))
  }
  // 点击忘记密码
  const forgetPwd = () => {
    setStep(1)
    setVisible(true)
  }
  // 关闭忘记密码
  const closeForgetPwd = () => {
    setVisible(false);
    setStep(1);
    setFormData({}, formData, {
      email: "",
      code: "",
      newPwd: "",
      confirmPwd: ""
    })
  }
  // 点击下一步
  const forgetNext = () => {
    if (!formData.email || !formData.code) {
      Taro.showToast({
        title: "请完善信息！",
        icon: "none"
      })
      return;
    }
    loginNext({
      testcode: formData.code
    }).then(res => {
      if (res.code === 40000) {
        setStep(2)
      } else {
        Taro.showToast({
          title: res.message || '验证失败！',
          icon: 'error'
        })
      }
    }).catch(err => {
      console.log(err)
      Taro.showToast({
        title: '验证失败！',
        icon: 'error'
      })
    })
  }
  // 点击返回
  const forgetPrev = () => {
    setStep(1)
    setFormData({}, formData, {
      newPwd: "",
      confirmPwd: ""
    })
  }
  // 获取验证码
  const getCode = () => {
    if (!formData.email) {
      Taro.showToast({
        title: "请输入邮箱号！",
        icon: "none"
      })
      return;
    }
    setIsSending(true);
    loginRegettestcode({
      username: formData.email
    }).then(res => {
      if (res.code === 10000) {
        Taro.showToast({
          title: '发送验证码成功',
          icon: 'none',
          duration: 2000
        });
        // 将token存到本地
        Taro.setStorageSync('token', res.data)
        // 将token存到全局数据中
        setGlobalData('token', res.data)
      } else {
        Taro.showToast({
          title: '发送验证码失败',
          icon: 'none',
          duration: 2000
        });
      }
      setIsSending(false);
    }).catch(err => {
      setIsSending(false); 
      console.log(err)
      Taro.showToast({
        title: '发送验证码失败',
        icon: 'none',
        duration: 2000
      });
    })
  }
  // 确认登录
  const confirmLogin = () => {
    if (!formData.newPwd || !formData.confirmPwd) {
      Taro.showToast({
        title: "请输入密码！",
        icon: "none"
      });
      return;
    }
    if (formData.newPwd !== formData.confirmPwd) {
      Taro.showToast({
        title: "两次密码不一致",
        icon: "none"
      });
      return;
    }
    resetpassword({
      password: formData.newPwd,
      repassword: formData.confirmPwd
    }).then(res => {
      if (res.code === 10000) {
        Taro.showToast({
          title: "重置成功",
          icon: "none"
        })
        closeForgetPwd();
      } else {
        Taro.showToast({
          title: res.message,
          icon: "none"
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    const token = getGlobalData('token') || Taro.getStorageSync('token')
    const isLogin = getGlobalData('isLogin') || Taro.getStorageSync('isLogin')
    if (token && isLogin === '1') {
      Taro.reLaunch({
        url: '/pages/Home/Index'
      })
    }
  }, [])

  return (
    <>
      <View className='body'>
        <SignupButton />
        <LoginButton />
        <View>
          <InputField
            className='email'
            type='text'
            placeholder=' 请输入QQ邮箱号'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </View>
        <View>
          <InputField
            className='password'
            type='password'
            placeholder=' 请输入密码'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </View>
        <View className="forget-pwd-btn" onClick={() => forgetPwd()}>忘记密码</View>
        <ActionButton 
        className='login'
        text='立即登录'
        onClick={handleLogin}
      />
        <Text className='occlusion'>.</Text>
      </View>
      <Modal
        title="找回密码"
        className="forget-pwd-modal" 
        isShowFooter={false}
        visible={visible}
        onCancel={closeForgetPwd}
      >
        <View className="forget-content">
          {step === 1 && 
            <View className="step-1">
              <View className="input-item">
                <Input
                  className="my-input"
                  type='text'
                  placeholder="请输入邮箱号"
                  value={formData.email}
                  onInput={(e) => changeFormData("email", e.target.value)}
                />
              </View>
              <View className="input-item input-item-code">
                <Input
                  className="my-input"
                  type='text'
                  placeholder='请输入验证码'
                  value={formData.code}
                  onInput={(e) => changeFormData("code", e.target.value)}
                />
                <Button onClick={() => getCode()} disabled={isSending} className="send-code-btn">
                  获取验证码
                </Button>
              </View>
              <View className="bottom-btn-box">
                <View className="bottom-btn" onClick={() => forgetNext()}>下一步 →</View>
              </View>
            </View>
          }
          {step === 2 && 
            <>
              <View className="back-btn" onClick={() => forgetPrev()}></View>
              <View className="step-2">
                <View className="input-item">
                  <Input
                    className="my-input"
                    type='password'
                    placeholder="请输入新密码......"
                    value={formData.newPwd}
                    onInput={(e) => changeFormData("newPwd", e.target.value)}
                  />
                </View>
                <View className="input-item">
                  <Input
                    className="my-input"
                    type='password'
                    placeholder="请确认新密码......"
                    value={formData.confirmPwd}
                    onInput={(e) => changeFormData("confirmPwd", e.target.value)}
                  />
                </View>
                <View className="bottom-btn-box">
                  <View className="bottom-btn" onClick={confirmLogin}>确认登录</View>
                </View>
              </View>
            </>
          }
        </View>
      </Modal>
    </>
  );
}

export default Login;
