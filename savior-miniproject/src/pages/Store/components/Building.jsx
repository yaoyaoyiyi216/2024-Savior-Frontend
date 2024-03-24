import React, { useState, useEffect } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Modal, Toast } from '@/components';
import { getStoreBuildings, upStoreBuildings } from '@/apis/store';

export default function Building() {

  // 建筑物列表 (接口上线把这个默认的改成空数组)
  const [buildingData, setBuildingData] = useState([
    // { id: 0, upgrade: 0, name: '太阳能建筑' },
    // { id: 1, upgrade: 0, name: '风力发电站' },
    // { id: 2, upgrade: 0, name: '水力发电站' },
    // { id: 3, upgrade: 0, name: '人工湿地' },
  ]);
  // 获取建筑物列表
  const getBuildingList = () => {
    getStoreBuildings('http://127.0.0.1:4523/m1/3942934-0-default/home/buildings').then(res => {
      setBuildingData(Array.isArray(res.data) ? res.data : [])
    }).catch(err => {
      console.log(err)
    })
  }
  // 问题列表
  const [answerList, setAnswerList] = useState([
    { ask: '太阳能属于（  ）次能源', select: [ 'A.一', 'B.二', 'C.三', 'D.四' ], asnwer: ['A', 'B', 'C', 'D'], right: 'A' },
    { ask: '你知道为何国外的风力发电机叶片是4叶，而我国是3叶吗？', select: [ 'A：我国的地理位置更适合建3叶风力发电机', 'B：3叶风力发电机的性价比更高' ], asnwer: ['A', 'B'], right: 'B' },
    { ask: '中国第一座水力发电站在何时正式发电？', select: [ 'A.1908', 'B.1910', 'C.1912', 'D.1915' ], asnwer: ['A', 'B', 'C', 'D'], right: 'C' },
    { ask: '下列属于人工湿地的是（ ）', select: [ 'A.湖泊', 'B.河流', 'C.稻田', 'D.滩涂' ], asnwer: ['A', 'B', 'C', 'D'], right: 'C' },
  ])
  
  // ======== 答题 ========
  const [answerVisible, setAnswerVisible] = useState(false);
  // 选择的答案
  const [activeAnswer, setActiveAnswer] = useState('')
  // 关闭答题
  const closeAnswer = () => {
    setAnswerVisible(false)
    setActiveIndex(-1)
    setActiveAnswer('')
  }
  // 选择
  const changeoption = (answer) => {
    setActiveAnswer(answer)
    if (answer === answerList[activeIndex].right) {
      console.log('回答正确')
      setIsError(false)
      upStoreBuildings({
        string: buildingData[activeIndex].name
      }).then(res => {
        
        if (res.code === 10000) {
          const _data = [...buildingData]
          _data[activeIndex].upgrade = 1;
          setBuildingData(_data)
        }
      })
    } else {
      console.log('回答错误')
      setIsError(true)
    }
    setTimeout(() => {
      setToastVisble(true)
    }, 300)
  }

  // ======== 升级 ========
  // 点击的索引
  const [activeIndex, setActiveIndex] = useState(-1);
  // 点击升级
  const openUpgrade = (item, index) => {
    if (item.upgrade) {
      return false;
    }
    setActiveAnswer('')
    setActiveIndex(index)
    setAnswerVisible(true)
    setActiveAnswer('')
  };

  // ======== 答题提示 ========
  const [toastVisible, setToastVisble] = useState(false);
  const [isError, setIsError] = useState(false);
  const tip = () => (
    <View className="tip">
      {  isError ?  '回答错误' : <View>恭喜，<Text>回答正确</Text>！</View>}
    </View>
  );
  const closeToast = () => {
    setToastVisble(false);
    if (buildingData[activeIndex].upgrade) {
      closeAnswer();
    } else {
      setToastVisble(false);
    }
  }

  useEffect(() => {
    getBuildingList();
  }, [])

  return (
    <>
      <View className="building-group">
        {buildingData.map((item, index) => (
          <View className="building-item" onClick={() => openUpgrade(item, index)} key={index}>
            <Image src={require(`@/assets/pictures/all/${item.name}.png`)}></Image>
            <View className={`building-btn ${item.upgrade ? 'is-upgrade' : ''}`}>
              {item.upgrade ? '已升级' : '未升级'}
            </View>
          </View>
        ))}
      </View>
      <Modal
        className="answer-modal" 
        visible={answerVisible}
        isShowFooter={false} 
        onCancel={closeAnswer}
      >
        <View className="answer-box">
            <View className="answer-title">
              完成知识小问答，快来给你的建筑升级吧！
            </View>
            { activeIndex > -1 && 
              <>
                <View className="answer-list">
                  <View className="answer-group">
                    {answerList[activeIndex].ask}
                  </View>
                  <View className="select-group">
                    { answerList[activeIndex].select.map((item, index) => (
                      <View className="select-item" key={index}>
                        { item }
                      </View>
                    ))}
                  </View>
                  <View className="option-group">
                    { answerList[activeIndex].asnwer.map((item, index) => (
                      <View  
                        className={`
                          option-item 
                          ${item === activeAnswer ? 'active' : ''} 
                          ${activeAnswer && isError ? 'error' : ''}
                        `} 
                        key={index}
                        onClick={() => changeoption(item)}
                      >
                        { item }
                      </View>
                    ))}
                  </View>
                </View>
              </>
            }
        </View>
      </Modal>
      <Toast
        className="answer-toast" 
        visible={toastVisible}
        tip={tip}
        onCancel={closeToast}
      >
        <View>
          { isError ? '加油！去了解更多的知识吧' : '真厉害，快去大陆上建造你的环保建筑物吧！' }
        </View>
      </Toast>
    </>
  )
}