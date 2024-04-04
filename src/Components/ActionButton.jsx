import { View, Button } from '@tarojs/components';


const ActionButton = ({ text, onClick, disabled ,className}) => {
  return (
    <View>
      <Button onClick={onClick} disabled={disabled} className={className}>
        {text}
      </Button>
    </View>
  );
};

export default ActionButton;
