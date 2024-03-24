import React, { useState } from 'react';
import { View, Button, Image } from '@tarojs/components'
import PopUp from './PopUp'

export default function More({ isOpen, close }) {
  const [popUpInfo, setPopUpInfo] = useState({
    isOpen: false,
    title: '',
    content: '',
    confirmText: '',
    onConfirm: () => { }
  })

  const openPopUp = (title, content, confirmText, onConfirm) => {
    setPopUpInfo({
      isOpen: true,
      title,
      content,
      confirmText,
      onConfirm
    })
  }

  const closePopUp = () => {
    setPopUpInfo({
      isOpen: false,
      title: '',
      content: '',
      confirmText: '',
      onConfirm: () => { }
    })
  }

  const handleClick = (title, content, confirmText, onConfirm) => {
    openPopUp(title, content, confirmText, onConfirm)
  }
  return (
    <View>

      <View style={{
        opacity: isOpen ? '1' : '0',
        height: '70vh',
        backgroundColor: '#bbe2ab',
        position: 'fixed',
        top: 0,
        right: '10vw',
        zIndex: 1,
        transition: '0.5s',
        
      }}>

        <Button onClick={close}>X</Button>


        <View style={{
          display:'flex',
          flexDirection:'column',
          alignContent:'center'
        }}>
          <Image src={require('@/assets/pictures/home/feedback.png')} onClick={() => handleClick(
            '问题反馈',
           '',
            '确认', () => {
            //反馈提交
            } )}/>
          <Image src={require('@/assets/pictures/home/infomation.png')} onClick={() => handleClick(
            '参考资料',
            '',
            '确认', () => {
              //弹窗消失
            })} />
          <Image src={require('@/assets/pictures/home/exit.png')} onClick={() => handleClick(
            '退出登录',
            '您确定要退出码？',
            '确认', () => {
              //退出登录
            })} />
          
        </View>
        <PopUp
          isOpen={popUpInfo.isOpen}
          onClose={closePopUp}
          onConfirm={popUpInfo.onConfirm}
          title={popUpInfo.title}
          content={popUpInfo.content}
          confirmText={popUpInfo.confirmText}
        />
      </View>
    </View>
  )
}