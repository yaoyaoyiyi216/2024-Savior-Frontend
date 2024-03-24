import Taro from '@tarojs/taro';
import { useState } from 'react';
import { View, Image } from '@tarojs/components';
import './Introduction.css';

const Introduction = () => {
  const backgrounds = [
    // require('@/assets/pictures/introduction/1.png'),
    // require('@/assets/pictures/introduction/2.png'),
    require('@/assets/pictures/introduction/3.png'),
    require('@/assets/pictures/introduction/4.png'),
    require('@/assets/pictures/introduction/5.png'),
    require('@/assets/pictures/introduction/6.png'),
    require('@/assets/pictures/introduction/7.png'),
    require('@/assets/pictures/introduction/8.png'),
    require('@/assets/pictures/introduction/9.png'),
  ];

  const classNames = [
    // 'class1',
    // 'class2',
    'class3',
    'class4',
    'class5',
    'class6',
    'class7',
    'class8',
    'class9'
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentClassName, setCurrentClassName] = useState(classNames[activeIndex]);

  
  const handleClick =() => {
    const nextIndex = (activeIndex + 1)%backgrounds.length;
    if (nextIndex === 0) {
      Taro.navigateTo({ url: '/pages/Home/Index' });
    } else {
      setActiveIndex(nextIndex);
      setCurrentClassName(classNames[nextIndex]);
    }
  };

  return (
    <View style={{
      backgroundImage: `url(${backgrounds[activeIndex]})`,
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh'
    }}>
      <Image
        className={currentClassName}
        src={require('@/assets/pictures/introduction/button.png')}
        onClick={handleClick}
      />
    </View>
  );
};

export default Introduction;




