import React, { useState } from 'react'
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import Card from './components/Card'; 
import './Game.css'
import CardGame from '@/components/CardGame'



// const images = [
//   {
//     id: 1,
//     url: require("@/assets/pictures/game/1.png"),
//     is_sign: 1,
//   },
//   {
//     id: 2,
//     url: require("@/assets/pictures/game/2.png"),
//     is_sign: 2,
//   },
//   {
//     id: 3,
//     url: require("@/assets/pictures/game/3.png"),
//     is_sign: 3,
//   },
//   {
//     id: 4,
//     url: require("@/assets/pictures/game/4.png"),
//     is_sign: 4,
//   },
//   {
//     id: 5,
//     url: require("@/assets/pictures/game/5.png"),
//     is_sign: 5,
//   },
//   {
//     id: 6,
//     url: require("@/assets/pictures/game/6.png"),
//     is_sign: 6,
//   },
//   {
//     id: 7,
//     url: require("@/assets/pictures/game/1.png"),
//     is_sign: 1,
//   },
//   {
//     id: 8,
//     url: require("@/assets/pictures/game/2.png"),
//     is_sign: 2,
//   },
//   {
//     id: 9,
//     url: require("@/assets/pictures/game/3.png"),
//     is_sign: 3,
//   },
//   {
//     id: 10,
//     url: require("@/assets/pictures/game/4.png"),
//     is_sign: 4,
//   },
//   {
//     id: 11,
//     url: require("@/assets/pictures/game/5.png"),
//     is_sign: 5,
//   },
//   {
//     id: 12,
//     url: require("@/assets/pictures/game/6.png"),
//     is_sign: 6,
//   },
//   {
//     id: 1,
//     url: require("@/assets/pictures/game/1.png"),
//     is_sign: 1,
//   },
  
// ];

const images = Array(13).fill({url: ''})

const shuff = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr;
}

export default function MyComponent() {
  const Random = [1, 1, 2, 2, 3, 3, 4, 4];
  const [arr, setArr] = useState(shuff(Random));
  const [frist, setFrist] = useState(0); // 每次循环第一次点击的牌号
  const [crrIndex, setCrrIndex] = useState(""); // 每次循环第一次点击的牌的索引
  const [active, setActive] = useState(""); // 每次循环第一张牌点击处于活动状态
  const [nextActive, setNextActive] = useState(""); // 每次循环第二张牌点击处于活动状态
  const [canRun, setCanRun] = useState(true); // 节流阀
  // 计步器
  const [step, setStep] = useState(20);

  function clearBefor(item, index) {
    // 判断是否步数之内
    if (step < 1) return; /* Taro.showToast({ title: "挑战失败!!!", icon: "none" }); */
    if (!canRun) return;
    setCanRun(false);
    if (item === "无") return setCanRun(true); // 已经被消除的牌,点击后返回
    setActive(index); // 当前被掀开的牌
    if (frist === 0) {
      setCanRun(true);
      // 点击第一张
      setNextActive("");
    } else {
      // 点击第二张
      setNextActive(crrIndex);
    }
    new Promise((resolve, reject) => {
      setFrist(item); // 记录每个循环第一次点击的牌号
      setCrrIndex(index); // 记录当前点的是哪张牌
      resolve();
    }).then(() => {
      if (crrIndex !== index) { // 要确保两次点的不是同一张牌
        if (frist !== item && frist !== 0) {
          setStep(step - 1);
          // 点击第二张
          // 每个循环点击的牌号不同时的输出,确保点两次才运算一次
          console.log("F");
          setFrist(0); // 点击两次一循环,结束此次循环
          setTimeout(() => {
            // 匹配失败后经过1秒回到翻拍前的状态
            setActive("");
            setNextActive("");
            // 打开节流阀
            setCanRun(true);
          }, 600);
        } else if (frist === item && frist !== 0) {
          // 步数减一
          setStep(step - 1);
          // 打开节流阀
          setCanRun(true);
          // 点击第二张
          // 成功匹配
          console.log("T");
          setActive("");
          setNextActive("");
          setFrist(0); // 点击两次一循环,结束此次循环
          let newArr = arr.map(arr_item => {
            if (item === arr_item) return "无";
            return arr_item;
          });
          setArr([...newArr]);
          console.log(newArr);
          // 成功条件
          if (newArr.every(element => element === "无")) {
            setTimeout(() => {
              Taro.showToast({ title: "恭喜你,过关了!!!", icon: "success" });
            }, 1000);
          }
        }
      }
      if (crrIndex === index) setCanRun(true);
    });
  }

  return (
    <View>
      <CardGame />
    </View>
  );
}
