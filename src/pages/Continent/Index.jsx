import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import './Continent.css'
import { placeAniminal, placePlant } from '@/apis/continent'
import { getStoreAniminial, getStorePlants, getStoreBuildings } from '@/apis/store'

const Index = () => {
  const [purificationRate, setPurificationRate] = useState('');
  const [totalCapacity, setTotalCapacity] = useState('');

  const [activeItem, setActiveItem] = useState('default')
  const changeActiveItem = (type) => {
    setActiveItem(type)
  }


  // 右侧模块要展示的内容  home-家园
  const [showType, setShowType] = useState('')
  const changeShowType = (type) => {
    if (showType === type) return;
    setShowType(type)
  }

  // ======= 家园 =======
  const [activeSub, setActiveSub] = useState(1);
  const [subBar, setSubBar] = useState([
    { name: '动物', type: 1, },
    { name: '植物', type: 2, },
    { name: '建筑物', type: 3, },
  ]);
  const changeHomeSub = (item) => {
    setChecked([])
    setActiveSub(item.type);
    // 这里有接口请求下面的列表
    getDataList(item.type);
  };
  // 有接口时返回列表
  const [dataList, setDataList] = useState([
    { id: 1, name: '藏狐', number: 1 },
    { id: 2, name: '金猫', number: 0 },
    { id: 3, name: '山地大猩猩', number: 1 },
    { id: 4, name: '雪兔子', number: 1 },
    { id: 5, name: '岩羊', number: 1 },
  ])
  // 获取列表的数据
  const getDataList = (type) => {
    (
      type === 1 ? getStoreAniminial :
      type === 2 ? getStorePlants :
      getStoreBuildings
    )().then(res => {
      setDataList(Array.isArray(res.data) ? res.data : [])
    }).catch(err => {
      console.log(err)
      setDataList([])
    })
  }

  // ======= 放置 =======
  const [checked, setChecked] = useState([])
  const checkItem = (item) => {
    // 这里支持勾选多个
    let _checked = [...checked]
    if (_checked.includes(item.id)) {
      _checked = _checked.filter(i => i !== item.id)
    } else {
      _checked.push(item.id)
    }
    // 单选
    // setChecked([item.id])
  }

   // 放置
  const placement = () => {
    if (!checked || !checked.length) {
      Taro.showToast({
        title: '请先勾选！',
        icon: 'none',
      })
      return false;
    }
    const _name = dataList.find(item => item.id === checked[0]).name
    // 发送请求
    if (activeSub === 1) {
      placeAniminal({
        animinalname: _name 
      }).then(res => {
        if (res.code === 10000) {
          setDataList(dataList.filter(i => !checked.includes(i.id))) // 正常情况这里应该请求一次列表
          setChecked([])
        } else {
          Taro.showToast({
            title: '放置失败！',
            icon: 'none'
          })
        }
      }).catch(err => {
        Taro.showToast({
          title: err || '放置失败！',
          icon: 'none'
        })
      })
    }
    if (activeSub === 2) {
      placePlant({
        plantname: _name
      }).then(res => {
        if (res.code === 10000) {
          setDataList(dataList.filter(i => !checked.includes(i.id))) // 正常情况这里应该请求一次列表
          setChecked([])
        } else {
          Taro.showToast({
            title: '放置失败！',
            icon: 'none'
          })
        }
      }).catch(err => {
        Taro.showToast({
          title: err || '放置失败！',
          icon: 'none'
        })
      })
    }
    // 没有放置建筑物
  }
   // 取消
   const cancelPlacement = () => {
    setChecked([])
   }

   useEffect(() => {
    getDataList(activeSub);
   }, [])

  return (
    <View className='main'>
      <View className='continent'>
        <Image src={require('@/assets/pictures/continent/1.png')} className='image' />
      </View>

      <View className='words'>
        <Text className='text'>大陆净化率: {purificationRate}</Text>
        <Text className='text'>大陆总产能: {totalCapacity}</Text>
      </View>
      <View className='icons-container'>
        <Image className='icon' src={require('@/assets/pictures/continent/capability.png')} onClick={() => changeShowType('')}/>
        <Image className='icon' src={require('@/assets/pictures/continent/home.png')} onClick={() => changeShowType('homeland')}/>
        <Image className='icon' src={require('@/assets/pictures/continent/backbutton.png')} onClick={() => { Taro.navigateBack(); }} />
      </View>
      {
        showType === 'homeland' && 
        <View className="homeland-continent">
          <View className="continent-left">
            <View className="left-bg"></View>
            <View className="left-group">
                <View className="left-title">{/* data.name */}</View>
              <View className="left-list">
                {dataList.map((item, index) => (
                  <View className="list-item" key={index}>
                    {
                      item.number > 0 && <View className={`chexk-box ${checked.includes(item.id) ? 'active' : ''}`} onClick={() => checkItem(item)}></View>
                    }
                    <Image mode="aspectFill" src={require(`@/assets/pictures/all/${item.name}.png`)}></Image>
                    <Text>{ item.name }</Text>
                  </View>
                ))}
              </View>
              <View className="left-bottom">
                <View className="btn" onClick={() => placement()}>放置</View>
                <View className="btn" onClick={() => cancelPlacement()}>取消</View>
              </View>
            </View>
          </View>
          <View className="continent-right">
            {subBar.map((item, index) => (
              <View
                class={`subitem ${item.type === activeSub ? 'active' : ''}`}
                key={index}
                onClick={() => changeHomeSub(item)}
              >
                <Image src={require(`@/assets/pictures/continent/sub${item.type}.png`)}/>
              </View>
            ))}
          </View>
        </View> ||
        <View className='continent-info'>
            <View className='name'>{/* data.name */}</View>
          <View className='content-main'>
            <View>
              <Image src={require('@/assets/pictures/continent/name.png')} className='icon2' />
              <Text>
                大陆名称 ：{/* data.name */}
              </Text>
            </View>
            <View>
              <Image src={require('@/assets/pictures/continent/details.png')} className='icon2' />
              <Text>
                大陆信息 ：
              </Text>
              {/* <View> {data.details}  </View> */}
            </View>
          </View>
        </View>
      }
    </View>
  );
};

export default Index;
