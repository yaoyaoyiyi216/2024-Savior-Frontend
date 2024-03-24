import Taro from '@tarojs/taro';
import { View, Text ,Image} from '@tarojs/components';

export default function Card(props) {
  const { active, nextActive, index, content } = props;

  return (
    <View onClick={props.fn} className="card">
      <View className={active === index || nextActive === index ? "card__content active" : "card__content"}>
        <View className="card-back">
          <Image src={require('@/assets/pictures/card/back.png')}/>
        </View>
        <View className="card-front">
          {content === "无" ? <Text style={{ fontSize: "30px" }} className='iconfont icon-wancheng1' /> : <Text>{content}</Text>}
        </View>
      </View>
    </View>
  );
}
