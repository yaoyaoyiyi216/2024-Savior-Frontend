import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';

function Foreword() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageList = [
    require('@/assets/pictures/index/登录2-1.png'),
    require('@/assets/pictures/index/登录2-2.png'),
    require('@/assets/pictures/index/登录2-3.png'),
    require('@/assets/pictures/index/登录2-4.png'),
    require('@/assets/pictures/index/登录2-5.png'),
    require('@/assets/pictures/index/登录2-6.png'),
    require('@/assets/pictures/index/登录2-7.png'),
    require('@/assets/pictures/index/登录2-8.png'),
    
  ];

  useEffect(() => {
    // 是否有登录状态
    const loginStatus = Taro.getStorageSync('loginStatus');
    if (loginStatus) {
      // 不是第一次登录
      Taro.navigateTo({ url: '/pages/Signup/Index' }); 
    }
  }, []);

  
  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % imageList.length;
    if (nextIndex === 0) {
      Taro.navigateTo({ url: '/pages/Signup/Index' }); 
    } else {
      setCurrentImageIndex(nextIndex);
    }
  };

  return (
    <View onClick={handleNextImage}>
      <Image
        src={imageList[currentImageIndex]}
        className="image"
        style={{ width: '100vw', height: '100vh' }}
      />
    </View>
  );
}

export default Foreword;



