
import { View, Image, Text } from '@tarojs/components';

function Item({ data, imageUrl, price }) {
  return (
    <View className="item">
      {data && (
        <View>
          <Image src={imageUrl} style={{ width: '100px', height: '100px' }} />
          <View>
            <Image src='../assets/pictures/energy.png'/>
            <Text>{`x${price} 购买`}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default Item;
