import React, { useState, useEffect, useRef } from 'react';
import { View, Image } from '@tarojs/components';
import { Modal } from '@/components'
import { choujiang } from '@/apis/shop'
import Taro from '@tarojs/taro';

export default function LotteryCard() {

  const timing = 8
  // 基本卡片顺序
  const [baseCardList] = useState([
    { id: 2, imageUrl: 'lottery2' },
    { id: 1, imageUrl: 'lottery1' },
    { id: 3, imageUrl: 'lottery3' },
  ])
  // 卡片列表
  const [cardList, setCardList] = useState(baseCardList)
  // 是否开始
  const [start, setStart] = useState(false)
  // 计时器
  const timer = useRef(null)
  // 抽中的信息
  const [lucky, setLucky] = useState({})
  // 随机数(模拟后台抽中)
  const getRandom = () => {
    return new Promise(resolve => {
      choujiang().then(res => {
        if (res.code === 10000) {
          setLucky(res.data)
          resolve(
            res.data.type === '大陆卡片' ? 3 : 
            res.data.type === '能量卡片' ? 2 :
            res.data.type === '动物卡片' ? 1 : 1
          )
        } else {
          resolve(false)
        }
      }).catch(err => {
        console.log(err)
        resolve(false)
      })
    })
    // const random = Math.random();
    // if (random < 1 / 3) {
    //   return 1;
    // } else if (random < 2 / 3) {
    //   return 2;
    // } else {
    //   return 3;
    // }
  }
  // 开始抽卡
  const startLottery = async () => {
    setCardList(baseCardList);
    console.log('点击了')
    // 生成1到3之间的随机整数(模拟后台抽中哪个)
    // 1 动物; 2 能量; 3 大陆
    const randomStop = await getRandom(); 
    if (!randomStop) {
      Taro.showToast({
        title: '网络错误',
        icon: 'none'
      })
      return false;
    }
    setReward(randomStop)
    if (randomStop === 1) {
      // 动物不做处理
      // return false;
    }
    if (randomStop === 2) {
      // 能量 将能量放到中间
      const _card = [...baseCardList]
      const last = _card.pop();
      _card.unshift(last)
      setCardList(_card)
    }
    if (randomStop === 3) {
      // 大陆 将大陆放到中间
      const _card = [...baseCardList]
      const first = _card.shift();
      _card.push(first)
      setCardList(_card)
    }
    setStart(true);
  }
  // ======== 抽奖结束弹窗 ========
  // 抽中的类型(后期根据实际修改, 目前用的card中的id)
  const [rewardType, setReward] = useState(null); // 1 动物; 2 能量; 3 大陆

  const [visible, setVisible] = useState(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
    setIsAccept(false)
  };
  // 动画结束事件
  const animationEnd = () => {
    openModal();
  }
  // 是否收下奖励
  const [isAccept, setIsAccept] = useState(false);
  // 收下奖励
  const acceptReward = () => {
    setIsAccept(true)
  }

  useEffect(() => {
    if (start) {
      timer.current = setTimeout(() => {
        setStart(false)
      }, 500 * timing)
    } else {
      if (timer.current) {
        clearTimeout(timer.current)
        animationEnd();
      }
    }
  }, [start])

  return (
    <>
      <View className="lottery-card">
        <View className="card-group">
          {cardList.map((item, index) => (
            <View 
              className={`card-item ${start ? 'active' : 'paused'}`}
              style={start ? { animation: `move${item.id} .5s ${timing}` } : {}}
            >
              <Image src={require(`@/assets/pictures/shop/${item.imageUrl}.png`)}></Image>
            </View>
          ))}
        </View>
        { !start && <View className="start-btn" onClick={() => startLottery()}>开始抽卡</View> }
      </View>
      <Modal
        className="lottery-result-modal"
        visible={visible}
        title={isAccept ? ''  : '恭喜玩家！！！'}
        footerText="收下"
        isShowFooter={!isAccept}
        onCancel={closeModal}
        onConfirm={acceptReward}
      >
        {
          !isAccept ? 
          <View className="result-content">
            {
              <View className="lottery">
                <View className="text">
                  <View>您在卡池中抽中了“{
                      rewardType === 1 ? '动物' :
                      rewardType === 2 ? '能量' :
                      rewardType === 3 ? '大陆' :
                      ''
                    }卡”，</View>
                  <View>快点击收下查看详情吧！</View>
                </View>
                <View className="card-box">
                  <Image src={require(`@/assets/pictures/shop/lottery${rewardType || 1}.png`)}></Image>
                </View>
              </View>
            }
          </View> : 
          <View className="accept-content">
            {
              rewardType === 3 ? 
              // 大陆
              <View className="accept-box-continent">
                <View className="accept-box">
                  <View className="image-box">
                    <Image src={lucky.url ? lucky.url : require(`@/assets/pictures/all/${lucky.name}.png`)} model="aspectFill"/>
                  </View>
                </View>
                <View className="text-box">
                  “森林碳汇”是指森林植物能够吸收大气中的二氧化碳并将其固定在植被或土壤中，从而减少二氧化碳在空气中的浓度。而雨林的碳汇力对于整个星球而言，极为重要。
                  但受人类活动的干扰，世界上的雨林的碳汇能力大不如前，甚至有些雨林可能会变成碳源。像婆罗洲这样的热带雨林，排放的二氧化碳很快将比吸收的多。
                </View>
              </View> :
              // 动物 能量 
              <View className="accept-box">
                <View className="image-box">
                  <Image src={lucky.url ? lucky.url : require(`@/assets/pictures/all/${lucky.name}.png`)} model="aspectFill"/>
                </View>
                { lucky.name && <View className="lucky-title">{ lucky.name }</View> }
              </View>
            }
          </View>
        }
      </Modal>
    </>
  )
}