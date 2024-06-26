
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

function SignupButton() {
  const handleClick = () => {
    Taro.redirectTo({
      url: '/pages/Signup/Index'
    })
  }

  return (
    <View>
      <Button
      style={{
          color:'#707070',
          fontFamily:'Segoe UI-Regular',
          position:'absolute',
          left:'180.38rpx',
          top:'109.41rpx',
          border: 'transparent',
          backgroundColor:'#d5f6c5',
          borderRadius: '20rpx 20rpx 0rpx 20rpx',
          width:'119.71rpx',
          height:'40rpx'
      }}
      onClick={handleClick}>注 册</Button>
    </View>
  )
}

export default SignupButton
