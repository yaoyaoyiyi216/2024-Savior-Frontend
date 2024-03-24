import { View, Input } from '@tarojs/components';

// 可以直接用的不需要封装
const InputField = ({ placeholder, value, onChange ,className}) => {
  return (
    <View>
      <Input
        type='text'
        placeholder={placeholder}
        value={value}
        onInput={onChange}
        className={className}
      />
    </View>
  );
};

export default InputField;
