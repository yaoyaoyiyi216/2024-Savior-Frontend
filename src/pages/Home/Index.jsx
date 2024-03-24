import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Continent from './components/Continent';
import ImageButton from './components/ImageButton';
import More from './components/More';
import { SubMenu } from '@/components'

import './Home.css'


function Home() {
  const [username, setUsername] = useState('');
  const [totalEnergy, setTotalEnergy] = useState(1000);
  const [remainingEnergy, setRemainingEnergy] = useState(1000);
  const [isOpen, setIsOpen] = useState(false)

  const toggleMore = () => {
    setIsOpen(!isOpen)
  }
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('接口');
  //     const data = await response.json();
  //     setUsername(data.username);
  //     setTotalEnergy(data.allEnergy);
  //     setRemainingEnergy(data.remainingEnergy);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  const images1 = {
    state1: require('@/assets/pictures/home/1.1.png'),
    // state2: require('@/assets/pictures/home/image2.png'),
  };
  return (
    <View className='body'>
      <View className='userinfo'>
        <Image
          className='planet'
          src={require('@/assets/pictures/home/planet.png')}></Image>
        <Text>我的星球名 : {username}</Text>


      </View>
      <View>
        <View className='totalenergy'>
          <Image
            className='energy'
            src={require('@/assets/pictures/home/energy.png')}></Image>
          <Text>总能量值:</Text>
          <View
            style={{
              'width': '49rpx',
              'height': '17rpx',
              'background': '#B5F0AE',
              'boxShadow': '0rpx 3rpx 5rpx 1rpx rgba(0,0,0,0.16), inset 0rpx 3rpx 5rpx 1rpx rgba(0,0,0,0.16)',
              'opacity': '0.5',
              'borderRadius':'2em',
              'marginLeft':'3.2em',
              'textAlign':'center'
            }}>{totalEnergy}</View>
        </View>
        <View className='remainingenergy'>
          <Image
            className='energy'
            src={require('@/assets/pictures/home/energy.png')}></Image>
          <Text>剩余能量值:</Text>
          <View
            style={{
              'width': '49rpx',
              'height': '17rpx',
              'background': '#B5F0AE',
              'boxShadow': '0rpx 3rpx 5rpx 1rpx rgba(0,0,0,0.16), inset 0rpx 3rpx 5rpx 1rpx rgba(0,0,0,0.16)',
              'opacity': '0.5',
              'borderRadius': '2em',
              'marginLeft': '3.2em',
              'textAlign': 'center'
            }}>{remainingEnergy}</View>
        </View>
      </View>
      <View className='main'>
        <Continent
          images={images1}
          state="state1"
          onClick={() => { }}
          navigateTo="/pages/Continent/Index"
          initialImage={require('@/assets/pictures/home/1.1.png')}
          className='continent1'
        />
        <Continent className='continent2' />
        <Continent className='continent3' />
        <Continent className='continent4' />
        <Continent className='continent5' />

      </View>
      <View className='navibar'>
        <ImageButton src={require('@/assets/pictures/home/shop.png')}
          className="shop"
          navigateTo="/pages/Shop/Index" />
        <ImageButton src={require('@/assets/pictures/home/store.png')}
          className="store"
          navigateTo="/pages/Store/Index" />
        <ImageButton src={require('@/assets/pictures/home/share.png')}
          className="share"
          navigateTo="/pages/Share/Index" />
        <Image src={require('@/assets/pictures/home/more.png')}
          className="more"
          onClick={toggleMore} />
      <View>
          {/* <More isOpen={isOpen} close={() => setIsOpen(false)} /> */}
          <SubMenu visible={isOpen} onClose={() => setIsOpen(false)} />
      </View>
      </View>
      <View className='sidebar'>
        <ImageButton src={require('@/assets/pictures/home/game.png')}
          className="game"
          navigateTo="/pages/Game/Index" />
        <ImageButton src={require('@/assets/pictures/home/knowledge.png')}
          className="knowledge"
          navigateTo="/pages/Knowledge/Index" />

      </View>
    </View >
  );
}

export default Home;
