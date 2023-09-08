import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useWizard } from "react-use-wizard";

import { fetchCurTests } from "../../services/servise";

import { takeNumberOfQuestions } from "../../redux/store/TestReducer";

import style from "../CreateSomeTest/testSetup.module.scss";

const optionsForCategory = [
  { value: 9, label: "General Knowledge" },
  { value: 10, label: "Entertainment: Books" },
  { value: 11, label: "Entertainment: Film" },
  { value: 12, label: "Entertainment: Music" },
  { value: 13, label: "Entertainment: Musicals & Theatres" },
  { value: 14, label: "Entertainment: Television" },
];

const optionsForDiffucalty = [
  { values: "easy", label: "Easy" },
  { values: "medium", label: "Medium" },
  { values: "hard", label: "Hard" },
];


const CreateTest = () => {

  const { nextStep } = useWizard();
  const dispatch = useDispatch();
  const [optionsForUrl, setoptionsForUrl] = useState({});
  const [createTets, setCreateTets] = useState(false);

  function generateUrl(objects) {
    const{amount,category,diffucalty} = objects
    dispatch(takeNumberOfQuestions(amount))
    const ourUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${diffucalty}&type=multiple`;
    return ourUrl;
  }
  

  useEffect(() => {
    if (createTets) {
      dispatch(fetchCurTests(generateUrl(optionsForUrl)));
    }

  }, [createTets]);

  const handelChange = (e) => {
    const amountValue = e.target.value;
    if (amountValue <= 32 && amountValue >= 10) {
      setoptionsForUrl({ ...optionsForUrl, amount: amountValue });
    }
  };
  
  return (
    <div className={style.box}>
      
      <div className={style.form__group}>
        <input
          type="input"
          className={style.form__field}
          placeholder="Name"
          name="name"
          id="name"
          required
          onChange={handelChange}
        />
        <label  className={style.form__label}>
          Створіть тест
        </label>
      </div>
      <Select
        type="categories"
        className={style.select}
        onChange={(event) =>
          setoptionsForUrl({ ...optionsForUrl, category: event.value })
        }
        options={optionsForCategory}
      />
      <Select
        className={style.select}
        onChange={(event) =>
          setoptionsForUrl({ ...optionsForUrl, diffucalty: event.values })
        }
        options={optionsForDiffucalty}
      />
      <div className={style.boxForBtns}>
        {createTets? <button className={style.goToTest} onClick={() =>setTimeout(()=>{
          nextStep()
        },1000) }>Go to test</button>:'ви не можете перейти до тесту доки не створите тест'}
      <button className={style.buttonCreate} onClick={() => setCreateTets(true)}> create Test </button>
      </div>
      
    </div>
  );
};

export default CreateTest;
