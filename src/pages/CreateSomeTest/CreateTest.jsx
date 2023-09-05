import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import Select from "react-select";

import { fetchCurTests } from "../../services/servise";

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
    
  const dispatch = useDispatch();
  const [optionsForUrl, setoptionsForUrl] = useState({});
  const [createTets, setcreateTets] = useState(false);
  useEffect(() => {
    if (createTets) {
      dispatch(fetchCurTests(generateUrl(optionsForUrl)));
    }
    return () => {
      setcreateTets(false);
    };
  }, [createTets]);

  const handelChange = (e) => {
    const amountValue = e.target.value;
    if (amountValue <= 32 && amountValue >= 10) {
      setoptionsForUrl({ ...optionsForUrl, amount: amountValue });
    }
  };
  
  return (
    <div>
      Я тест
      <input onChange={handelChange} />
      <Select
        type="categories"
        className=""
        onChange={(event) =>
          setoptionsForUrl({ ...optionsForUrl, category: event.value })
        }
        options={optionsforcategory}
      />
      <Select
        className=""
        onChange={(event) =>
          setoptionsForUrl({ ...optionsForUrl, diffucalty: event.values })
        }
        options={optionsfordiffucalty}
      />
      <button onClick={() => setcreateTets(true)}> create Test </button>
    </div>
  );
};

export default CreateTest;
