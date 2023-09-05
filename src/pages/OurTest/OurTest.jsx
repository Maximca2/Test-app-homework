import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import style from "../OurTest/ourTest.module.scss";

const OurTest = () => {

  const [numberOfQuastion, setNumberOfQuastion] = useState(0);
  const [nextTest, setnextTest] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(null);
  const testData = useSelector((state) => state.toolkit.tests).flat();
  
  useEffect(()=>{
      setButtonIndex(null)
  },[buttonIndex])
  
  const combineData = (arr) => {
    const arrToCorrectandIncorrect = [];
    const curArrTest = arr[numberOfQuastion];
    const filteredArr = arr.filter((it) => it === curArrTest);

    filteredArr.forEach((it) => {
      const { incorrect_answers, correct_answer } = it;
      const incorrectAndCorect = [incorrect_answers, correct_answer].flat();
      arrToCorrectandIncorrect.push(incorrectAndCorect);
    });
    return arrToCorrectandIncorrect.flat();
  };

  const checkData = (data, value,index) => {
    
      
    if (value.correct_answer === data) {
      setnextTest(true);
      setButtonIndex(index);
    }

  };

  useEffect(() => {
    setnextTest(false);
    if (nextTest) {
      nextPage();
    }
  }, [nextTest]);

  const showCurrentQuastion = (arr) => {
    const questionData = [];
    arr.forEach((it) => {
      questionData.push(it.question);
    });
    return questionData;
  };
  const nextPage = () => {
    if (nextTest) {
      const curentPage = numberOfQuastion + 1;
      setNumberOfQuastion(curentPage);
    }
  };

  return (
    <div className={style.box}>
      {!testData ? (
        "даних немає"
      ) : (
        <div className={style.someVariable}>
          {numberOfQuastion===9?'Питання закінчилися': combineData(testData)?.map((it, i) => {
            return (
              <div
                className= {buttonIndex === i ? style.red : style.curent}
                key={i}
                onClick={() => checkData(it, testData[numberOfQuastion],i)}
                
              >
                {it}
              </div>
            );
          })}
          {numberOfQuastion === 9
            ? "питання закінчилися"
            : showCurrentQuastion(testData.flat())[numberOfQuastion]}
        </div>
      )}
    </div>
  );
};

export default OurTest;
