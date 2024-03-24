import React, { useState, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { Modal } from '@/components';
import './index.css'

const Game = () => {
  // 卡片数据 matched 是否匹配成功; flipped 是否翻转
  const [cards, setCards] = useState([
    { id: 1, value: '百岁兰', flipped: false, matched: false, imageUrl: '百岁兰' },
    { id: 2, value: '百岁兰', flipped: false, matched: false, imageUrl: '百岁兰' },
    { id: 3, value: '耳廓狐', flipped: false, matched: false, imageUrl: '耳廓狐' },
    { id: 4, value: '耳廓狐', flipped: false, matched: false, imageUrl: '耳廓狐' },
    { id: 5, value: '风滚草', flipped: false, matched: false, imageUrl: '风滚草' },
    { id: 6, value: '风滚草', flipped: false, matched: false, imageUrl: '风滚草' },
    { id: 7, value: '大王花', flipped: false, matched: false, imageUrl: '大王花' },
    { id: 8, value: '大王花', flipped: false, matched: false, imageUrl: '大王花' },
    { id: 9, value: '科莫多巨蜥', flipped: false, matched: false, imageUrl: '科莫多巨蜥' },
    { id: 10, value: '科莫多巨蜥', flipped: false, matched: false, imageUrl: '科莫多巨蜥' },
    { id: 11, value: '长颈鹿', flipped: false, matched: false, imageUrl: '长颈鹿' },
    { id: 12, value: '长颈鹿', flipped: false, matched: false, imageUrl: '长颈鹿' },
  ]);
  // 抽牌法随机排列数组
  const shuffle = (data) => {
    const arr = [...data]
    let temp = [];
    for(let i = arr.length; i > 0 ;i--){
        let temRandom =  Math.floor(Math.random() * i)
        temp.push(arr[temRandom])
        arr.splice(temRandom, 1)//抽取一张后，要除去这张牌，然后在剩下的牌中继续抽
    }
    return temp
  }
  // 当前已翻转的卡片
  const [flippedCards, setFlippedCards] = useState([]);
  // 是用了几步
  const [moves, setMoves] = useState(0);
  // 游戏是否结束
  const [gameOver, setGameOver] = useState(false);
  // 游戏是否成功
  const [isSuccess, setIsSuccess] = useState(false);
  // 防止点击过快可以点击三张
  const flag = useRef(true);

  // 根据点击的卡片index更新卡片的翻转状态
  const handleCardClick = (index) => {
    // 如果
    // 游戏结束 或者
    // 已翻转的卡片数量为2 或者
    // flag 为 false 或者 
    // 当前点击的卡片已经翻转 或者 
    // 当前点击的卡片已经匹配成功
    // 则不做任何操作
    if (
        gameOver || 
        flippedCards.length === 2 || 
        !flag.current || 
        cards[index].flipped || 
        cards[index].matched
      ) {
      return;
    }
    flag.current = false
    // 点击的卡片翻转
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    // 获取翻转的卡片
    setFlippedCards([...flippedCards, newCards[index]]);
    // flippedCards.length === 1 时表示翻转了两张
    if (flippedCards.length === 1) {
      // 翻转两张步数加1
      setMoves(moves + 1);
      // flippedCards[0] 翻转的第一张
      // newCards[index] 翻转的第二张
      // 如果两个对应的值相同则匹配成功
      if (flippedCards[0].value === newCards[index].value) {
        setTimeout(() => {
          // 此处遍历cards数据，将value值相同的改成匹配成功
          const matchedCards = cards.map((card) =>
            card.value === newCards[index].value ? { ...card, matched: true } : card
          );
          setCards(matchedCards);
          // 判定，如果每个匹配参数都为true则游戏结束
          if (matchedCards.every((card) => card.matched)) {
            setIsSuccess(true)
            setGameOver(true);
          }
          flag.current = true
        }, 1000);
      } else {
        // 匹配失败
        setTimeout(() => {
          // 匹配失败，如果当前翻转了，则翻转回去
          const resetCards = cards.map((card) =>
            card.flipped ? { ...card, flipped: false } : card
          );
          setCards(resetCards);
          flag.current = true
        }, 1000);
      }
      // 处理完后重置翻转卡片参数
      setFlippedCards([]);
    } else {
      flag.current = true
    }
  };

  // ======== 计时 ========
  const baseSeconds = 60;
  const [seconds, setSeconds] = useState(baseSeconds);
  const timer = useRef(null)

  // 清空定时器
  const clearTimer = () => {
    if (timer.current) clearInterval(timer.current)
  }
  // 开始计时
  const startCountdown = () => {
    timer.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 0) {
          clearTimer();
          console.log('倒计时结束');
          // 设置状态失败、并结束游戏
          setIsSuccess(false)
          setGameOver(true);
          return 0;
        } else {
          return parseFloat((prevSeconds - 0.01).toFixed(2));
        }
      });
    }, 10)
  };
  // 暂停计时
  const pauseCountdown = () => {
    clearTimer();
  };
  // 重置计时
  const resetCountdown = () => {
    clearTimer();
    setSeconds(baseSeconds);
  };

  // ======== 弹窗 ========
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    setVisible(true)
  }
  const closeModal = () => {
    setVisible(false)
  }
  // 收下能量
  const acceptEnergy = () => {
    // to do others
    
    setVisible(false)
  }

  // ======== 初始化展示 ========
  const setCardsFlipped = (flipped, data) => {
    let _card = [...data]
    _card = _card.map(item => ({ ...item, flipped }))
    setCards(_card)
  }
  // card更新差一步使用传值方式
  const initCard = (data) => {
    setTimeout(() => {
      setCardsFlipped(true, data);
    }, 1000)
    setTimeout(() => {
      setCardsFlipped(false, data);
      startCountdown();
    }, 2500)
  }

  useEffect(() => {
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [timer]);

  // 初始化打乱排序
  useEffect(() => {
    const _card = shuffle(shuffle(cards))
    setCards(_card);
    initCard(_card);
  }, [])
  // 监听步数和是否结束
  useEffect(() => {
    if (gameOver) {
      clearTimer();
      openModal();
    }
  }, [gameOver, moves]);

  return (
    <>
      <View className="card-game-wrapper">
        <View className="game-left">
          <View className="btn-group">
            <View className="timer-box">
              <View className="timer-icon"></View>
              <View className="countdown">{seconds.toFixed(2)}s</View>
            </View>

          </View>
        </View>
        <View className="game-right">
          <View className="card-group">
            {cards.map((card, index) => (
              <View
                className={`card-item ${card.flipped || card.matched ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
                key={card.id}
              >
                {
                  card.flipped || card.matched ?
                  <View className="back">
                    <Image src={require(`@/assets/pictures/all/${card.imageUrl}.png`)}/>
                  </View> : 
                  <View className="front">
                    <Image src={require('@/assets/pictures/game/game-card-bg.png')}/>
                  </View>
                }
              </View>
            ))}
          </View>
        </View>
      </View>
      <Modal
        visible={visible}
        title={isSuccess ? '挑战成功' : '挑战失败'}
        className={`result-modal ${isSuccess ? 'success' : 'fail'}`}
        footerText="收下"
        isShowFooter={isSuccess}
        onCancel={closeModal}
        onConfirm={acceptEnergy}
      >
        <View className="result-content">
          {
            isSuccess ? 
            <View className="success-box">
              <View className="tip">
                <View>恭喜玩家成功通过了</View>
                <View>“{ '极光之旅' }”的挑战，</View>
                <View>快收下你的奖励吧！</View>
              </View>
              <View className="energy-box">
                <View className="energy-icon"></View>
                <View className="energy-count">× { '1k' }</View>
              </View>
              <View className="success-icon1"></View>
              <View className="success-icon2"></View>
            </View> :
            <View className="fail-box">
              不要灰心，下次继续努力吧！
              挑战成功后，可以获得能量值
              奖励噢~
              <View className="fail-icon"></View>
            </View>
          }
        </View>
      </Modal>
    </>
  );
};
export default Game;