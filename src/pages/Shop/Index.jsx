import React, { useState, useEffect } from 'react';
import { View, Image, Button } from '@tarojs/components';
import Item from './components/Item';
import './Shop.css';
import BackButton from '../../Components/BackButton';
import LotteryCard from './components/LotteryCard'
import { getStopAniminial, getStopPlants, getStopBuildings } from '@/apis/shop'

function Shop() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState(null);

  const getData = (index) => {
    (index === 0 ? getStopAniminial : 
     index === 1 ? getStopPlants :
     getStopBuildings
    )().then(res => {
      setData(Array.isArray(res.data) ? res.data : [])
    }).catch(err => {
      console.log(err)
      setData([])
    })
  }
  const handleClick = (index) => {
    setActive(index);
    if (index < 3) {
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
          src={require('@/assets/pictures/shop/1.png')}
          className={`header-item ${active === 0 ? 'active' : ''}`}
          onClick={() => handleClick(0)}
        />
        <Image
          src={require('@/assets/pictures/shop/2.png')}
          className={`header-item ${active === 1 ? 'active' : ''}`}
          onClick={() => handleClick(1)}
        />
        <Image
          src={require('@/assets/pictures/shop/3.png')}
          className={`header-item ${active === 2 ? 'active' : ''}`}
          onClick={() => handleClick(2)}
        />
        <Image
          src={require('@/assets/pictures/shop/4.png')}
          className={`header-item ${active === 3 ? 'active' : ''}`}
          onClick={() => handleClick(3)}
        />
      </View>
      <View className='main'>
        { active === 3 && <LotteryCard /> }
        {
          active !== 3 &&
          <View className='item-box'>
            { data && data.length > 0 && data.map((item, index) => {
              return (
                <Item 
                  key={index} 
                  imageUrl={require(`@/assets/pictures/all/${item.name}.png`)} 
                  price={item.price === 0 ? '0' : (item.price || '∞')}
                />
              )
            })}
          </View>
        }
      </View>
    </View>
  );
}

export default Shop; 
