import React from 'react';
import { View, Image, Text } from '@tarojs/components';

function Item({ item }) {
  return (
    <View className="item">
      <View className="image-container">
        <Image src={item.url} className="item-image" mode="aspectFill"/>
        <View>{item.name}</View>
        <View className="item-info">
          <Image
            src={require('@/assets/pictures/store/energy.png')}
            className="energy-icon"
          />
          <Text className="text">{`已拥有 x${item.number || 0}`}</Text>
        </View>
      </View>
    </View>
  );
}

export default Item;