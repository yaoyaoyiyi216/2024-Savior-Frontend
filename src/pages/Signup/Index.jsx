import Taro from '@tarojs/taro';
import { useState } from 'react';
import { View, Text, Button, Checkbox , ScrollView} from '@tarojs/components';
import InputField from '../../Components/InputField';
import ActionButton from '../../Components/ActionButton';
import './Signup.css';
import SignupButton from './components/SignupButton';
import LoginButton from './components/LoginButton';
import { loginRegettestcode } from '@/apis/login'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  //这里记得改一下
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(true);
  
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSendCode = () => {
    
    setIsSendingCode(true); 

    loginRegettestcode({
      username: username
    }).then(res => {
      if (res.code === 10000) {
        Taro.showToast({
          title: '验证码已发送',
          icon: 'success',
          duration: 2000
        });
      } else {
        Taro.showToast({
          title: '发送验证码失败',
          icon: 'none',
          duration: 2000
        });
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
      Taro.showToast({
        title: '发送验证码失败',
        icon: 'none',
        duration: 2000
      });
    })
  };

  const handleSubmit = () => {
    if (!isPrivacyChecked) {
      Taro.showToast({
        title: '请先同意隐私协议',
        icon: 'none',
        duration: 2000
      });
      return; 
    }

    // 提交注册数据
    const requestBody = {
      username: username,
      verificationCode: verificationCode
    };
    // 验证验证码
    loginNext({
      testcode: verificationCode
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    // 发起注册请求
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          Taro.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          });
          Taro.navigateTo({
            url: '/pages/Name/Index' 
          });
        } else {
          throw new Error('注册失败');
        }
      })
      .catch(error => {
        console.error('注册失败:', error.message);
        Taro.showToast({
          title: '注册失败',
          icon: 'none',
          duration: 2000
        });
      });
  };

  const handlePrivacyCheckboxChange = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
  };
  const handlePrivacyTextClick = () => {
    setIsPrivacyVisible(true); 
  };

  const handleClosePrivacyText = () => {
    setIsPrivacyVisible(false); 
  };
  
  return (
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
  );
};

export default Signup;


