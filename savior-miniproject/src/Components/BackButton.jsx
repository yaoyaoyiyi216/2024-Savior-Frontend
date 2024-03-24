import Taro from '@tarojs/taro';
import { View, Text} from '@tarojs/components';


function BackButton({outlook}) {
  const handleClick = () => {
    Taro.navigateBack();
  };

  return (
    <View 
    onClick={handleClick}
    className='backbutton'
    >
      <Text>{outlook}</Text>
    </View>
  );
}

export default BackButton;
