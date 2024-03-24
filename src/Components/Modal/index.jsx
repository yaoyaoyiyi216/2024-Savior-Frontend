/* 弹窗组件 */
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import './index.css'

export default function SubMenu(props) {
  const {
    className = "", // 额外的className
    visible = false, // 是否显示
    title = "", // 弹窗标题
    footerText = "确认", // 底部按钮文字
    isShowFooter = true, // 是否展示底部按钮
    onCancel = () => { }, // 取消 + 关闭
    onConfirm = () => { }, // 确认
  } = props;

  return (<>
    {visible && 
      <View className={`modal-wrapper ${className}`} onClick={onCancel}>
        <View className="modal-content" onClick={e => e.stopPropagation()}>
          <View className="close-icon" onClick={onCancel}></View>
          <View className="modal-header">{ title }</View>
          <View className="modal-main">
            { props.children }
          </View>
          {isShowFooter && 
            <View className="modal-footer">
              <View className="footer-btn" onClick={onConfirm}>{ footerText }</View>
            </View>
          }
        </View>
      </View>
    }
  </>)
}