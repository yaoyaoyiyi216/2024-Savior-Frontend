import Taro from '@tarojs/taro';
import { useState } from 'react';
import { View, Input, Image} from '@tarojs/components';
import './Name.css';

const Name = () => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = () => {
    const url = '';

    
    const data = {
      name: name
    };

    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('数据提交成功');
        Taro.navigateTo({
          url:'/pages/Introduction/Index'
        })
        } else {
          console.error('数据提交失败');
        }
      })
      .catch(error => {
        console.error('发生错误:', error);
      });
  }

  return (
    <View className='body'>
      
      <Input
        className='textinput'
        type='text'
        
        value={name}
        onInput={handleNameChange}
      />
      <Image 
        src={require('@/assets/pictures/name/arrow.png')}
      className='arrow'
      onClick={handleSubmit}></Image> 
    </View>
  )
}

export default Name;


