/* 侧栏组件 */
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Image, Input } from '@tarojs/components';
import { Modal } from '@/components'
import './index.css'
import { setGlobalData } from '@/config/data'

export default function SubMenu(props) {
  const {
    visible = false, // 是否显示
    onClose = () => {}, // 关闭
  } = props;
  
  // ======== 问题反馈 ========
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    content: ''
  })
  const changeFeedback = (v) => {
    setFeedbackForm(Object.assign({}, feedbackForm, { content: v }))
  }
  const openFeedback = () => {
    setFeedbackVisible(true)
  }
  const closeFeedback = () => {
    setFeedbackVisible(false)
  } 
  const subFeedback = () => {
    if (!feedbackForm.content) {
      Taro.showToast({
        title: '请输入反馈！',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    // 提交的逻辑（没接口直接提示成功并关闭）
    Taro.showToast({
      title: '反馈成功！',
      icon: 'none',
      duration: 2000
    });
    closeFeedback();
    setFeedbackForm(Object.assign({}, feedbackForm, { content: '' }))
  }

  // ======== 参考资料 ========
  const [referenceVisible, setReferenceVisible] = useState(false);
  const openReference = () => {
    setReferenceVisible(true)
  }
  const closeReference = () => {
    setReferenceVisible(false)
  }

  // ======== 退出登录 ========
  const [loginoutVisible, setLoginoutVisible] = useState(false);
  const openLoginout = () => {
    setLoginoutVisible(true)
  }
  const closeLoginout = () => {
    setLoginoutVisible(false)
  } 
  const loginOut = () => {
    Taro.setStorageSync({
      key: 'token',
      data: ''
    })
    setGlobalData('token', '')
    Taro.reLaunch({
      url: '/pages/Login/Index'
    })
  }

  return (
    <>
      <View className={`sub-menu-wrapper ${visible ? 'show' : 'hide'}`}>
        <View className="sub-menu-group">
          <View className="close-icon" onClick={onClose}></View>
          <View className="sub-menu-item" onClick={openFeedback}>
            <Image src={require('@/assets/pictures/home/feedback.png')}></Image>
          </View>
          <View className="sub-menu-item" onClick={openReference}>
            <Image src={require('@/assets/pictures/home/infomation.png')}></Image>
          </View>
          <View className="sub-menu-item" onClick={openLoginout}>
            <Image src={require('@/assets/pictures/home/exit.png')}></Image>
          </View>
        </View>
      </View>
      <Modal
        className="loginout-modal" 
        visible={loginoutVisible} 
        onCancel={closeLoginout}
        onConfirm={loginOut}
      >
          <View>确认退出登录吗？</View>
      </Modal>
      <Modal
        className="reference-modal" 
        title="参考资料"
        visible={referenceVisible}
        isShowFooter={false} 
        onCancel={closeReference}
      >
          <View className="reference-list">
            {/* 这里添加参考资料 */}
          </View>
      </Modal>
      <Modal
        className="feedback-modal" 
        footerText="反馈"
        visible={feedbackVisible}
        onCancel={closeFeedback}
        onConfirm={subFeedback}
      >
        <Input 
          value={feedbackForm.content || ''} 
          placeholder="请输入您的问题…………" 
          onInput={changeFeedback}
        />
      </Modal>
    </>
  )
}