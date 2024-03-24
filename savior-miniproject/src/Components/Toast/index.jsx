/* 提示组件 */
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import './index.css'


export default function Toast(props) {
  const {
    visible = false,
    className = "",
    tip = () => {},
    onCancel = () => {},
  } = props;

  return (<>
    {visible && 
      <View className={`toast-wrapper ${className}`} onClick={onCancel}>
        <View className="toast-content" onClick={e => e.stopPropagation()}>
          <View className="close-icon" onClick={onCancel}></View>
          <View className="toast-header">{ tip() }</View>
          <View className="toast-main">
            { props.children }
          </View>
        </View>
      </View>
    }
  </>)
}