import React from 'react';
import { View, Image, Text } from '@tarojs/components';

function Item({ imageUrl, price }) {
  return (
    <View className="item">
      <View className="image-container">
        <Image src={imageUrl} className="item-image" />
        <View className="item-info">
          <Image
            src={require('@/assets/pictures/shop/energy.png')}
            className="energy-icon"
          />
          <Text className="price-text">{`x${price} 购买`}</Text>
        </View>
      </View>
    </View>
  );
}

export default Item;
