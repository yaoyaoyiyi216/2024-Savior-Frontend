import React from 'react';
import { View, Image, Text } from '@tarojs/components';

function Item({ imageUrl, amount }) {
  return (
    <View className="item">
      <View className="image-container">
        <Image src={imageUrl} className="item-image" />
        <View className="item-info">
          <Image
            src={require('@/assets/pictures/store/energy.png')}
            className="energy-icon"
          />
          <Text className="text">{`已拥有 x${amount}`}</Text>
        </View>
      </View>
    </View>
  );
}

export default Item;