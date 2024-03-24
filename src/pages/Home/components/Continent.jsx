import { useState, useEffect } from 'react';
import ImageButton from './ImageButton';
import PropTypes from 'prop-types';

function Continent({ images, state, onClick, navigateTo ,initialImage,className}) {
  const [selectedImage, setSelectedImage] = useState(initialImage || '');

  useEffect(() => {
    
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

