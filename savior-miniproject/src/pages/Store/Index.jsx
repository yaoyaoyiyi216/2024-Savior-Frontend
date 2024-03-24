import React, { useState, useEffect } from 'react';
import { View, Image, Button } from '@tarojs/components';
import Item from './components/Item';
import './Store.css';
import BackButton from '../../Components/BackButton';
import Building from './components/Building';
import { getStoreAniminial, getStorePlants } from '@/apis/store'

function Store() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState(null)
  
  const getData = (index) => {
    (index === 0 ? getStoreAniminial : getStorePlants)().then(res => {
      setData(Array.isArray(res.data) ? res.data : [])
    }).catch(err => {
      console.log(err)
      setData([])
    })
  }
  const handleClick = (index) => {
    setActive(index);
    if (index < 2) {
      getData(index)
    }
  }

  useEffect(() => {
    getData(active);
  }, []); 

  return (
    <View className='shop'>
      <View className='header'>
        <BackButton outlook='<' />
        <Image
          src={require('@/assets/pictures/store/1.png')}
          className={`header-item ${active === 0 ? 'active' : ''}`}
          onClick={() => handleClick(0)}
        />
        <Image
          src={require('@/assets/pictures/store/2.png')}
          className={`header-item ${active === 1 ? 'active' : ''}`}
          onClick={() => handleClick(1)}
        />
        <Image
          src={require('@/assets/pictures/store/3.png')}
          className={`header-item ${active === 2 ? 'active' : ''}`}
          onClick={() => handleClick(2)}
        />
        
      </View>
      <View className='main'>
        { active === 2 && <Building /> }
        {
          active !== 2 && 
          <View className='item-box'>
            { data && data.length > 0 && data.map((item, index) => {
              return (
                <Item imageUrl={require(`@/assets/pictures/all/${item.name}.png`)} amount={item.number}/>
              )
            })}
          </View>
        }
      </View>
    </View>
  );
}

export default Store;
