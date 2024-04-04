import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { buyStopAniminial, buyStopPlant, buyStopBuilding } from '@/apis/shop';

function Item({ item, active }) {
  
  const handleBuy = () => {
    const filed = active === 0 ? 'animinalname' : active === 1 ? 'plantname' : 'goodbuildingname';
    (active === 0 ? buyStopAniminial : 
      active === 1 ? buyStopPlant :
      buyStopBuilding
     )({
      [filed]: item.name 
     }).then(res => {
       Taro.showToast({
         title: res.message || '提示错误！',
         icon: 'none'
       })
     }).catch(err => {
       console.log(err)
     })
  }

  return (
    <View className="item">
      <View className="image-container">
        <Image src={item.url} className="item-image" mode="aspectFill"/>
        <View class="item-name">{item.name}</View>
        <View className="item-info" onClick={() => handleBuy()}>
          <Image
            src={require('@/assets/pictures/shop/energy.png')}
            className="energy-icon"
          />
          <Text className="price-text">{`x${item.price === 0 ? '0' : (item.price || '∞')} 购买`}</Text>
        </View>
      </View>
    </View>
  );
}

export default Item;
