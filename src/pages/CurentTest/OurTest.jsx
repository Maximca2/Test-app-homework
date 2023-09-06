import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import style from "./ourTest.module.scss";

const OurTest = () => {
  const [numberOfQuastion, setNumberOfQuastion] = useState(0);
  const [nextTest, setnextTest] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(null);
  const [isCorrect, setisCorrect] = useState(false);
  const [right, setright] = useState(true);
  const testData = useSelector((state) => state.toolkit.tests).flat();

  useEffect(() => {
    if (!right) {
      setright(true);
    }
    setTimeout(() => {
      setisCorrect(false);
    }, 1000);
    setButtonIndex(null);
  }, [buttonIndex]);

  const combineData = (arr) => {
    const arrToCorrectandIncorrect = [];
    const curArrTest = arr[numberOfQuastion];
    const filteredArr = arr.filter((it) => it === curArrTest);
    filteredArr.forEach((it) => {
      const { incorrect_answers, correct_answer } = it;
      const incorrectAndCorect = [incorrect_answers, correct_answer].flat();
      arrToCorrectandIncorrect.push(incorrectAndCorect);
    });
    const randomQuastions = arrToCorrectandIncorrect
      .flat()
      .sort(() => (Math.random() > 0.5 ? 1 : -1));
    return randomQuastions;
  };

  const checkData = (data, value, index) => {
    if (value.correct_answer === data) {
      setisCorrect(true);
      setnextTest(true);
      setButtonIndex(index);
    }
    setright(false);
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
    <div className={right ? style.boxNotRight : style.box}>
      {right ? "Розвязуйте" : "щось не так"}
      <div className={style.test}>тест</div>
      <div className={style.tittle}>
        {isCorrect ? "Відповідь правильна" : null}
      </div>
      {!testData ? (
        "даних немає"
      ) : (
        <div className={style.someVariable}>
          <div className={style.numberquastion}>
            Питання: {numberOfQuastion}
          </div>
          {numberOfQuastion === 9
            ? "Питання закінчилися"
            : combineData(testData)?.map((it, i) => {
                return (
                  <div
                    className={buttonIndex === i ? style.red : style.curent}
                    key={i}
                    onClick={() => checkData(it, testData[numberOfQuastion], i)}
                  >
                    {it}
                  </div>
                );
              })}
          <div className={style.question}>
            {numberOfQuastion === 9
              ? null
              : showCurrentQuastion(testData.flat())[numberOfQuastion]}
          </div>
        </div>
      )}
    </div>
  );
};

export default OurTest;
