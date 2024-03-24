
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

function LoginButton() {
  const handleClick = () => {
    Taro.navigateTo({
      url: '/pages/Login/Index'
    })
  }

  return (
    <View>
      <Button 
        style={{
          color: '#707070',
          fontFamily: 'Segoe UI-Regular',
          position: 'absolute',
          left: '400.86rpx',
          top: '109.41rpx',
          border:'transparent',
          backgroundColor: '#d5f6c5',
          borderRadius: '20rpx 20rpx 20rpx 0rpx',
          width: '119.71rpx',
          height: '40rpx'
        }}
      onClick={handleClick}>登 录</Button>
    </View>
  )
}

export default LoginButton
