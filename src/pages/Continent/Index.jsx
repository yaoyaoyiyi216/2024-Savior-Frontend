import Taro, { useRouter } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import './Continent.css';
import {
  placeAniminal,
  placePlant,
  purifyPlaceBuilding,
  getMainlandYunluo,
  getMainlandMier,
  getMainlandXilun,
  getMainlandKala,
  getMainlandWulan,
  getMainlandReport,
} from '@/apis/continent';
import {
  funcPlaceAniminal,
  funcPlacePlant,
  getStoreBuildings,
  getStoreBadBuildings
} from '@/apis/store';
import { getGlobalData } from '@/config/data';
import { utils } from '@/config/utils'

const Index = () => {
  // 接收地址栏参数
  const router = useRouter();
  const item = JSON.parse(router.params.item || "{}")

  // 大陆基本信息
  const [mainlandInfo, setMainlandInfo] = useState({})
  // 请求
  const landFetch = {
    "1": getMainlandXilun,
    "2": getMainlandMier,
    "3": getMainlandWulan,
    "4": getMainlandKala,
    "5": getMainlandYunluo,
  }
  // 颜色
  const landColors = {
    "1": { backColor: "#BBE2AB", textColor: "#409F61" },
    "2": { backColor: "#FFC495", textColor: "#C7541E" },
    "3": { backColor: "#D9F0A4", textColor: "#9DB467" },
    "4": { backColor: "#F0EDAC", textColor: "#CCC612" },
    "5": { backColor: "#DCF6FC", textColor: "#27B9D4" },
  }
  // 获取大陆基本信息
  const getData = () => {
    landFetch[item.id]().then(res => {
      if (res.code === 10000) {
        setMainlandInfo(Object.assign({}, mainlandInfo, res?.data?.land || {}))
        // 请求产能报告
        getReportInfo(res?.data?.land?.name)
      } else {
        Taro.showToast({
          title: res.message || '请求错误！',
          icon: "none"
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  
  // showType homeland-家园; report-产能报告
  const [showType, setShowType] = useState('')
  const changeShowType = (type) => {
    if (showType === type) {
      setShowType('')
    } else {
      setShowType(type)
    };
  }

  // ======= 家园 =======
  
  const [activeSub, setActiveSub] = useState(1);
  
  const [buildingsType, setBuildingsType] = useState('')
  const [subBar, setSubBar] = useState([
    { name: '动物', type: 1, },
    { name: '植物', type: 2, },
    { name: '建筑物', type: 3, },
  ]);
  // 修改建筑物类型
  const changeBuildingsType = (type) => {
    setBuildingsType(type);
    getDataList(activeSub, type)
  }
  // 修改侧栏
  const changeHomeSub = (item) => {
    setChecked([])
    setBuildingsType('')
    setActiveSub(item.type);
    // 这里有接口请求下面的列表
    getDataList(item.type, '');
  };
  // 有接口返回列表
  const [dataList, setDataList] = useState([])
  // 获取列表的数据
  const getDataList = (type, bType) => {
    if (type === 3 && !bType) {
      return;
    };
    setDataList([]);
    (
      type === 1 ? funcPlaceAniminal :
        type === 2 ? funcPlacePlant :
          bType === 'good' ? getStoreBuildings :
            getStoreBadBuildings
    )({
      mainlandname: mainlandInfo.name
    }).then(res => {
      // 后端给的字段
      const filed = type === 1 ? 'animinals' :
        type === 2 ? 'plants' :
          bType === 'good' ? 'buildings' :
            'badbuildings';
      setDataList(Array.isArray(res.data[filed]) ? res.data[filed] : [])
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
    setChecked([item.id])
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
          setDataList(dataList.filter(i => !checked.includes(i.id)))
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
          setDataList(dataList.filter(i => !checked.includes(i.id)))
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
  // 取消放置
  const cancelPlacement = () => {
    setChecked([])
  }
  // 净化污染物
  const purifyBuilding = (item) => {
    if (!item.number) {
      Taro.showToast({
        title: "无该污染物！",
        icon: "none"
      })
      return false;
    }
    purifyPlaceBuilding({
      badbuildingname: item.name || '',
      planetname: getGlobalData('starInfo')?.starName || '',
      mainlandname: mainlandInfo.name || ''
    }).then(res => {
      Taro.showToast({
        title: res.message || '',
        icon: 'none'
      })
      if (res.code === 10000) {
        getDataList(activeSub, buildingsType);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // 产能报告
  const [reportInfo, setReportInfo] = useState({});
  const getReportInfo = (mainlandname) => {
    if (!mainlandname) return;
    getMainlandReport({
      mainlandname
    }).then(res => {
      if (res.code === 10000) {
        setReportInfo(Object.assign({}, reportInfo, res?.data?.report || {}))
      } else {
        Taro.showToast({
          title: res.message || "请求失败",
          icon: "none"
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    getDataList(activeSub, '');
    getData();
  }, [])

  return (
    <View className='main'>
      <View className='continent'>
        <Image src={require(`@/assets/pictures/home/${item.id}.${utils.handleStarStatus(item.status, item.cleanrate)}.png`)} />
      </View>

      <View className='words'>
        <Text className='text'>大陆净化率: {(parseFloat(mainlandInfo.allcleanrate || 0) * 100).toFixed(2)}%</Text>
        <Text className='text'>大陆总产能: {mainlandInfo.allproduct || 0}k</Text>
      </View>
      <View className='icons-container'>
        <Image className='icon' src={require('@/assets/pictures/continent/capability.png')} onClick={() => changeShowType('report')} />
        <Image className='icon' src={require('@/assets/pictures/continent/home.png')} onClick={() => changeShowType('homeland')} />
        <Image className='icon' src={require('@/assets/pictures/continent/backbutton.png')} onClick={() => { Taro.navigateBack(); }} />
      </View>
      { // 家园
        showType === 'homeland' &&
        <View className="homeland-continent">
          <View className="continent-left">
            <View className="left-bg"></View>
            {
              !buildingsType && activeSub === 3 &&
              // 选择建筑物按钮
              <View className="buildings-btns-group">
                <View className="buildings-title">{mainlandInfo.name || '--'}</View>
                <View className="buildings-btns">
                  <View className="buildings-btn-item" onClick={() => changeBuildingsType('good')}>环保建筑物</View>
                  <View className="buildings-btn-item" onClick={() => changeBuildingsType('bad')}>污染物</View>
                </View>
              </View> ||
              // 展示列表
              <View className="left-group">
                {
                  buildingsType !== 'bad' &&
                  // 非污染物
                  <>
                    <View className="left-title">
                      {buildingsType === 'good' ? '环保建筑物' : mainlandInfo.name || '--'}
                    </View>
                    <View className="left-list">
                      {dataList.map((item, index) => (
                        <View className="list-item" key={index}>
                          {item.number > 0 &&
                            <View
                              className={`chexk-box ${checked.includes(item.id) ? 'active' : ''}`}
                              onClick={() => checkItem(item)}
                            ></View>
                          }
                          <Image mode="aspectFill" src={item.url}></Image>
                          <Text>{item.name}</Text>
                        </View>
                      ))}
                    </View>
                    <View className="left-bottom">
                      <View className="btn" onClick={() => placement()}>放置</View>
                      <View className="btn" onClick={() => cancelPlacement()}>取消</View>
                    </View>
                  </> ||
                  // 污染物
                  <>
                    <View className="left-title">污染物</View>
                    <View className="left-list left-list-bad">
                      {dataList.map((item, index) => (
                        <View className="list-item list-item-bad" key={index}>
                          <View className="number-box">
                            ×{item.number}
                          </View>
                          <Image mode="aspectFill" src={item.url}></Image>
                          <Text>{item.name}</Text>
                          <View className="purify-btn" onClick={() => purifyBuilding(item)}>净化</View>
                        </View>
                      ))}
                    </View>
                  </>
                }
              </View>
            }
          </View>
          <View className="continent-right">
            {subBar.map((item, index) => (
              <View
                class={`subitem ${item.type === activeSub ? 'active' : ''}`}
                key={index}
                onClick={() => changeHomeSub(item)}
              >
                <Image src={require(`@/assets/pictures/continent/sub${item.type}.png`)} />
              </View>
            ))}
          </View>
        </View>
      }
      { // 产能报告
        showType === 'report' &&
        <View className="report-continent">
          <View className="report-bg"></View>
          <View className="report-box">
            <View className="report-title">昨 日 产 能 报 告</View>
            <View className="report-content">
              <View className="report-item">
                <View className="report-item-label">动物</View>
                <View className="report-item-text">{reportInfo?.animinalclean || 0}k</View>
              </View>
              <View className="report-item">
                <View className="report-item-label">植物</View>
                <View className="report-item-text">{reportInfo?.plantclean || 0}k</View>
              </View>
              <View className="report-item">
                <View className="report-item-label">环保建筑</View>
                <View className="report-item-text">{reportInfo?.goodbuildingclean || 0}k</View>
              </View>
              <View className="report-item">
                <View className="report-item-label">污染</View>
                <View className="report-item-text">{reportInfo?.pollution || 0}k</View>
              </View>
            </View>
            <View className="report-bottom">总计：{reportInfo?.cleanliness || 0}k</View>
          </View>
        </View>
      }
      { // 默认信息
        showType === '' &&
        <View
          className='continent-info'
          style={{ background: landColors[item.id].backColor }}
        >
          <View
            className='name'
            style={{ color: landColors[item.id].textColor }}
          >{mainlandInfo.name || '--'}</View>
          <View className='content-main'>
            <View>
              <Image src={require('@/assets/pictures/continent/name.png')} className='icon2' />
              <Text>
                大陆名称 ：{mainlandInfo.name || '--'}
              </Text>
            </View>
            <View>
              <Image src={require('@/assets/pictures/continent/details.png')} className='icon2' />
              <Text>
                大陆信息 ：
              </Text>
              <ScrollView
                scrollY={true}
                style={{height:'38vh'}}
              > 
              <Text>
                    {mainlandInfo.climate}
              </Text>
                </ScrollView>
            </View>
          </View>
        </View>
      }
    </View>
  );
};

export default Index;
