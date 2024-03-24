import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

function ImageButton({ src, className,  navigateTo }) {
  const handleClick = () => {
    
    Taro.navigateTo({
      url: navigateTo
    });
  };
  
  return (
    <View 
     
    onClick={handleClick}>
      <Image 
        src={src} className={`navi-item ${className}`}
         />
    </View>
  );
}

ImageButton.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  navigateTo: PropTypes.string.isRequired
};

export default ImageButton;
