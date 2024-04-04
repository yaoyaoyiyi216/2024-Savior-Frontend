/* 侧栏组件 */
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Image, Input, ScrollView } from '@tarojs/components';
import { Modal } from '@/components'
import './index.css'
import { setGlobalData } from '@/config/data'
import { feedback } from '@/apis/home';

export default function SubMenu(props) {
  const {
    visible = false, // 是否显示
    onClose = () => { }, // 关闭
  } = props;

  // ======== 问题反馈 ========
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    content: ''
  })
  const changeFeedback = (e) => {
    setFeedbackForm(Object.assign({}, feedbackForm, { content: e.target.value }))
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
    // 提交
    feedback({
      paper: feedbackForm.content
    }).then(res => {
      if (res.code === 10000) {
        Taro.showToast({
          title: '反馈成功！',
          icon: 'none',
          duration: 2000
        });
        closeFeedback();
        setFeedbackForm(Object.assign({}, feedbackForm, { content: '' }))
      } else {
        Taro.showToast({
          title: '反馈失败！',
          icon: 'none'
        })
      }
    }).catch(err => {
      console.log(err)
    })
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
    Taro.setStorageSync('token', '')
    Taro.setStorageSync('isLogin', '0')
    setGlobalData('token', '')
    setGlobalData('isLogin', '0')
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
          <ScrollView
          scrollY={true}
          style={{height:'40vh'}}
          >
            本小程序中
            真实图片来自于Pixabay、摄图网、千库网
            其余图片由midjourny生成

            文案参考：
            中国科学院、中国国家地理、
            中国热带作物种质资源信息网、人民网、
            科普中国网、百度百科、知乎、bilibili、
            网易新闻、澎湃新闻、新浪微博、光明网、
            科学探索网、搜狐、人民号、
            infoanimales、海洋财富网

            如有侵权或内容有误，请即使联系删除。

          </ScrollView>
         
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