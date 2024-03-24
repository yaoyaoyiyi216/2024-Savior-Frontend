import { useState, useEffect } from 'react';
import ImageButton from './ImageButton';
import PropTypes from 'prop-types';

function Continent({ images, state, onClick, navigateTo ,initialImage,className}) {
  const [selectedImage, setSelectedImage] = useState(initialImage || '');

  useEffect(() => {
    // 监听传入的属性值变化，根据属性值选择对应的图片
    // 你不传东西，你赋值个鸡毛
    // setSelectedImage(images[state]);
  }, [state, images]);

  return (
    <ImageButton
      src={selectedImage}
      onClick={onClick}
      navigateTo={navigateTo}
      className={className}
    />
  );
}

Continent.propTypes = {
  images:PropTypes.object.isRequired, 
  state:PropTypes.string.isRequired, 
  onClick:PropTypes.func, 
  navigateTo:PropTypes.string.isRequired, 
  initialImage:PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Continent;

