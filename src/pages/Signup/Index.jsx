import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Text, Button, Checkbox , ScrollView, Input } from '@tarojs/components';
import InputField from '../../Components/InputField';
import ActionButton from '../../Components/ActionButton';
import './Signup.css';
import SignupButton from './components/SignupButton';
import LoginButton from './components/LoginButton';
import { signup, signupSetPwd,  signupSendcode } from '@/apis/signup'
import { getGlobalData, setGlobalData } from '@/config/data'
import { Modal } from '@/components';

const Signup = () => {
  // 邮箱
  const [username, setUsername] = useState('');
  // 验证码
  const [verificationCode, setVerificationCode] = useState('');
  // 是否已发送
  const [isSendingCode, setIsSendingCode] = useState(false);
  //这里记得改一下 // 勾选隐私协议
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(true);
  // 隐私弹窗
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);

  // 修改账号
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  // 修改验证码
  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  // 获取验证码
  const handleSendCode = () => {
    setIsSendingCode(true); 
    signupSendcode({
      username: username
    }).then(res => {
      if (res.code === 10000) {
        Taro.showToast({
          title: '验证码已发送',
          icon: 'success',
          duration: 2000
        });
        Taro.setStorageSync('token', res.data)
        setGlobalData('token', res.data)
      } else {
        Taro.showToast({
          title: '发送验证码失败',
          icon: 'none',
          duration: 2000
        });
      }
      setIsSendingCode(false); 
    }).catch(err => {
      setIsSendingCode(false); 
      console.log(err)
      Taro.showToast({
        title: '发送验证码失败',
        icon: 'none',
        duration: 2000
      });
    })
  };
  // 提交注册
  const handleSubmit = () => {
    if (!isPrivacyChecked) {
      Taro.showToast({
        title: '请先同意隐私协议',
        icon: 'none',
        duration: 2000
      });
      return; 
    }
    if (!username) {
      Taro.showToast({
        title: '请输入QQ邮箱',
        icon: 'none',
        duration: 2000
      });
      return; 
    }
    if (!verificationCode) {
      Taro.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      });
      return; 
    }
    // 验证验证码
    signup({
      testcode: verificationCode
    }).then(res => {
      if (res.code === 40000) {
        Taro.showToast({
          title: res.message || '验证成功！',
          icon: 'success'
        })
        openSetPwd();
      } else {
        Taro.showToast({
          title: '注册失败！',
          icon: 'error'
        })
      }
    }).catch(err => {
      console.log(err)
      Taro.showToast({
        title: '注册失败！',
        icon: 'error'
      })
    })
  };

  // ======== 设置密码弹窗 ========
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("")
  const openSetPwd = () => {
    setVisible(true);
  }
  const closeSetPwd = () => {
    setVisible(false);
    setPassword("");
  }
  const subSetPwd = () => {
    if (!password) {
      Taro.showToast({
        title: "请填写密码！",
        icon: "none"
      })
      return;
    }
    signupSetPwd({
      password
    }).then(res => {
      if (res.code === 40000) {
        Taro.showToast({
          title: res.message || "注册成功！",
          icon: "none"
        })
        setTimeout(() => {
          Taro.reLaunch({
            url: '/pages/Name/Index'
          })
        }, 600)
      } else {
        Taro.showToast({
          title: res.message || "注册失败！",
          icon: "none"
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const handlePrivacyCheckboxChange = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
  };
  const handlePrivacyTextClick = () => {
    setIsPrivacyVisible(true); 
  };

  const handleClosePrivacyText = () => {
    setIsPrivacyVisible(false); 
  };

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
        <InputField
          className='email'
          placeholder=' 请输入QQ邮箱号'
          value={username}
          onChange={handleUsernameChange}
        />
        <InputField
          className='verificationCode'
          placeholder=' 请输入验证码'
          value={verificationCode}
          onChange={handleVerificationCodeChange}
        />
        <ActionButton
          className='getverificationCode'
          text={isSendingCode ? '发送中...' : '发送验证码'}
          onClick={handleSendCode}
          disabled={isSendingCode}
        />
        <ActionButton
          className='signup'
          text='立即注册'
          onClick={handleSubmit}
          disabled={false}
        />
        <View>
          <Text
            className='privacytitle'
            onClick={handlePrivacyTextClick}
          >注册前请先仔细阅读并勾选</Text>
          <Text
            className='privacytitle2'
            onClick={handlePrivacyTextClick}
          >隐私协议</Text>
          <Checkbox 
            className='checkbox'
          checked={isPrivacyChecked} 
          onChange={handlePrivacyCheckboxChange} />
        </View>
        {isPrivacyVisible &&
          <View>

            <View className='privacytext'>
              <Text className='header'>隐私条款</Text>
              <ScrollView 
              
              scrollY={true}
              className='content'
              >救星小程序为了保障您的个人隐私，我们依据最新的国家监管要求，向您进行以下说明：
                1.	用户提供信息与权限
                当您使用我们的小程序游戏时，我们会向您请求并收集以下一些个人信息与权限：
                (1)	邮箱登录权限
                (2)	图片储存权限
                (3)	跳转到其他应用分享权限
                2.	信息与权限使用目的
                (1)	帮助您更加便捷的建立游戏账户
                (2)	便于保存大陆截图
                (3)	便于分享大陆截图
                3. 数据安全
                我们采取适当的技术和组织措施来保护您的个人信息，防止未经授权的访问、泄露、滥用或篡改。并按照上述隐私指引的用途使用你的个人信息，未经你的同意，不会向第三方分享你的任何信息。
                4. 隐私政策的更新
                我们可能会不时更新本隐私政策，以反映服务的变化和用户反馈。更新后的隐私政策将在小程序内发布，建议您定期查看。
                5. 联系我们
                如果您对本隐私政策有任何疑问或意见，请通过以下方式联系我们：
                QQ：2784996418
                6. 适用法律
                本隐私政策受到适用法律的约束，如有冲突，将以法律规定为准。
                7.其他说明
                当您勾选《隐私政策》后，表示您已同意该《隐私政策》。
  </ScrollView>
            </View>
            <Button 
            className='closeprivacytext'
            onClick={handleClosePrivacyText}
            >X</Button>
          </View>
        }
      </View>
      
      <Modal
        className="set-pwd-modal"
        visible={visible}
        onCancel={closeSetPwd}
        onConfirm={subSetPwd}
      >
        <View className="set-pwd-content">
          <View className="title">请输入您的密码：</View>
          <View className="input-item">
            <Input
              className="my-input"
              type='password'
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Signup;


