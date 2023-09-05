import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useWizard } from "react-use-wizard";

import { fetchCurTests } from "../../services/servise";

import style from "../CreateSomeTest/testsetup.module.scss";

const optionsforcategory = [
  { value: 9, label: "General Knowledge" },
  { value: 10, label: "Entertainment: Books" },
  { value: 11, label: "Entertainment: Film" },
  { value: 12, label: "Entertainment: Music" },
  { value: 13, label: "Entertainment: Musicals & Theatres" },
  { value: 14, label: "Entertainment: Television" },
];

const optionsfordiffucalty = [
  { values: "easy", label: "Easy" },
  { values: "medium", label: "Medium" },
  { values: "hard", label: "Hard" },
];

function generateUrl(objects) {
  const ourUrl = `https://opentdb.com/api.php?amount=${objects?.amount}&category=${objects?.category}&difficulty=${objects?.diffucalty}&type=multiple`;
  return ourUrl;
}

const CreateTest = () => {
  const { nextStep } = useWizard();
  const dispatch = useDispatch();
  const [optionsForUrl, setoptionsForUrl] = useState({});
  const [createTets, setcreateTets] = useState(false);

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
        options={optionsforcategory}
      />
      <Select
        className={style.select}
        onChange={(event) =>
          setoptionsForUrl({ ...optionsForUrl, diffucalty: event.values })
        }
        options={optionsfordiffucalty}
      />
      <div className={style.boxForBtns}>
        {createTets?<button className={style.goToTest} onClick={() => nextStep()}>Go to test</button>:'ви не можете перейти доки не створите тест'}
      <button className={style.buttonCreate} onClick={() => setcreateTets(true)}> create Test </button>
      </div>
      
    </div>
  );
};

export default CreateTest;