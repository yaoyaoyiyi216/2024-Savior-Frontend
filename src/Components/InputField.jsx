import { View, Input } from '@tarojs/components';


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
