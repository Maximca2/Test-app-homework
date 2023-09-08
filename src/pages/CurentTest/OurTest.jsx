import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import style from "./ourTest.module.scss";

const cleanFromSymbols = (curIt) => {
  const arrForCleanedQuestions = [];
  const spesialSymbols = /[&,;,#,0,3,9]+/g;

  if (typeof curIt === "string") {
    return curIt.replaceAll(spesialSymbols, "");
  }
  
    curIt.forEach((curObjs) => {
    const cleanedQuestion = curObjs.map((it) =>
      it.replaceAll(/[&,;,#,0,3,]+/g, "")
    );
    arrForCleanedQuestions.push(cleanedQuestion)
  });

  return arrForCleanedQuestions

};
const showCurrentQuestion = (arr) => {
  const questionData = [];
  arr.forEach((it) => {
    const question = it.question;

    questionData.push(cleanFromSymbols(question));
  });

  return questionData;
};

const OurTest = () => {
  // ourData
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [nextTest, setnextTest] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [right, setrRght] = useState(true);
  const testData = useSelector((state) => state.toolkit.tests).flat();

  const oursQuestions = useSelector(
    (state) => state.toolkit.ourQuestions
  ).flat();
  const numberOfQuestionsMax = useSelector(
    (state) => state.toolkit.numberOfQuestions
  ).join("");

  useEffect(() => {
    setTimeout(() => {
      setIsCorrect(false);
    }, 1000);

    setButtonIndex(null);
  }, [buttonIndex]);

  const checkData = (data, value, index) => {
    if (value.correct_answer === data) {
      setIsCorrect(true);
      setnextTest(true);
      setButtonIndex(index);
    }
    setrRght(false);
  };

  useEffect(() => {
    setnextTest(false);
    if (nextTest) {
      nextPage();
      if (!right) {
        setrRght(true);
      }
    }
  }, [nextTest]);


  const nextPage = () => {
    if (nextTest) {
      const currentPage = numberOfQuestion + 1;
      setNumberOfQuestion(currentPage);
    }
  };

  return (
    <>
      {right ? "Розвязуйте" : "щось не так"}
      <div className={right ? style.boxNotRight : style.box}>
        <div className={style.test}>тест</div>
        <div className={style.tittle}>
          {isCorrect ? "Відповідь правильна" : null}
        </div>
        {!testData ? (
          "даних немає"
        ) : (
          <div className={style.someVariable}>
            <div className={style.numberQuastion}>
              Питання: {numberOfQuestion}
            </div>
            {numberOfQuestion === numberOfQuestionsMax - 1
              ? "Питання закінчилися"
              : cleanFromSymbols(oursQuestions)[numberOfQuestion].map(
                  (it, i) => {
                    return (
                      <div
                        className={buttonIndex === i ? style.red : style.curent}
                        key={i}
                        onClick={() =>
                          checkData(it, testData[numberOfQuestion], i)
                        }
                      >
                        {it}
                      </div>
                    );
                  }
                )}
            <div className={style.curQuestion}>
              {numberOfQuestion === numberOfQuestionsMax - 1
                ? null
                : showCurrentQuestion(testData.flat())[numberOfQuestion]}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OurTest;
