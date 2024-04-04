import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import ImageButton from './components/ImageButton';
import { SubMenu } from '@/components';
import { getGlobalData, setGlobalData } from '@/config/data';
import { getPlanetInfo } from '@/apis/home';
import { utils } from '@/config/utils'

import './Home.css'


function Home() {
  // 全局星球信息
  const [starInfo, setStarInfo] = useState(getGlobalData('starInfo'));
  // 大陆信息列表
  const [continentList, setContinentList] = useState([
    { id: 1, name: "西伦瑞亚", cleanrate: 0, status: true }, // 森林
    { id: 2, name: "米尔勒拉", cleanrate: 0, status: false }, // 山地
    { id: 3, name: "乌兰宇蒂", cleanrate: 0, status: false }, // 草原
    { id: 4, name: "碦拉玛干", cleanrate: 0, status: false }, // 沙漠
    { id: 5, name: "云格雷诺", cleanrate: 0, status: false }, // 冰原
  ])
  // ======== 侧栏 ========
  const [isOpen, setIsOpen] = useState(false)
  const toggleMore = () => {
    setIsOpen(!isOpen)
  }
  // 获取星球基本信息
  const getStarInfo = () => {
  //   if (!starInfo.starName) {
  //     Taro.showToast({
  //       title: "星球未命名",
  //       icon: "error",
  //     })
  //     return ;
  //   }
    getPlanetInfo({
      planetname: starInfo.starName
    }).then(res => {
      if (res.code === 10000) {
        const { planet = {} } = res.data
        const _starInfo = Object.assign({}, starInfo, planet || {}, {
          starName: planet?.name || ''
        })
        // 给大陆的列表赋值
        if (
          Array.isArray(planet?.Mainlandinformation?.mainlands) && 
          planet?.Mainlandinformation?.mainlands?.length
        ) {
          setContinentList(planet?.Mainlandinformation?.mainlands)
        };
        setStarInfo(_starInfo)
        setGlobalData('starInfo', _starInfo)
        
        if (_starInfo.token) {
          // 将token存到本地
          Taro.setStorageSync('token', _starInfo.token)
          // 将token存到全局数据中
          setGlobalData('token', _starInfo.token)
        }
      } else {
        Taro.showToast({
          title: res.message || '请求失败！',
          icon: "none"
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // 点击大陆跳转详情
  const toDetail = (item => {
    if (!item.status) {
      Taro.showToast({
        title: "该大陆未解锁！",
        icon: "none"
      })
      return false;
    }
    Taro.navigateTo({
      url: `/pages/Continent/Index?item=${JSON.stringify(item)}`,
    })
  })

  useEffect(() => {
    getStarInfo();
  }, [])

  return (
    <View className='body'>
      <View className='userinfo'>
        <Image className='planet' src={require('@/assets/pictures/home/planet.png')}></Image>
        <Text>我的星球名 : {starInfo.starName}</Text>
      </View>
      <View className="energy-box">
        <View className='totalenergy'>
          <Image className='energy' src={require('@/assets/pictures/home/energy.png')}></Image>
          <Text>总能量值:</Text>
          <View className="energy-text">{starInfo.allenergy || 0}k</View>
        </View>
        <View className='remainingenergy'>
          <Image className='energy' src={require('@/assets/pictures/home/energy.png')}></Image>
          <Text>剩余能量值:</Text>
          <View className="energy-text">{starInfo.restenergy || 0}k</View>
        </View>
      </View>
      <View className='main'>
        {continentList.map((item, index) => (
          <View 
            className={`continent-item continent-item-${item.id}`}
            onClick={() => toDetail(item)}
            key={index}
          >
            <Image src={require(`@/assets/pictures/home/${item.id}.${utils.handleStarStatus(item.status, item.cleanrate)}.png`)}/>
          </View>
        ))}
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
