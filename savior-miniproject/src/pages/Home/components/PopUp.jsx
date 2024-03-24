
import { useState } from 'react'
import { View, Button } from '@tarojs/components'


const PopUp = ({ isOpen, onClose, onConfirm, title, content, confirmText }) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <View>
      {isOpen && (
        <View className='popup'>
          <View className='popup-content'>
            <View className='popup-title'>{title}</View>
            <View className='popup-body'>{content}</View>
            <View className='popup-actions'>
              <Button onClick={handleConfirm}>{confirmText}</Button>
              <Button onClick={onClose}>取消</Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default PopUp
