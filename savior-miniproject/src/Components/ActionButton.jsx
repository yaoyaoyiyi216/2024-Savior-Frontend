import { View, Button } from '@tarojs/components';

// 这个这么简单不需要组件...
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
