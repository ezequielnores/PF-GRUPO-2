import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFrequentAskByAsk,
  createFrequentAsk,
  updateFrequentAskById,
  getAllFrequentQuestions,
  deleteFrequentAskById,
} from "../../redux/reducers/frequentQuestionsReducer";
import ButtonsFQ from "./ButtonsFQ";
import FormFQ from "./FormFQ";
import ListFQ from "./ListFQ";

const ManageFQ = (props) => {
  const dispatch = useDispatch();
  const allFQ = useSelector((state) => state.frequentQuestions.list);
  const [ask, setAsk] = useState("");
  const [frequentAsk, setFrequentAsk] = useState(null);
  const [crudFQ, setCrudFQ] = useState({
    create: false,
    read: false,
    update: false,
    delete: false,
  });

  const findFQ = () => {
    const frequentAskFound = allFQ.find((fQ) => fQ.ask === ask);
    setFrequentAsk(frequentAskFound);
    setAsk("");
  };

  const createFQ = () => {
    setCrudFQ({
      create: true,
      read: false,
      update: false,
      delete: false,
    });
  };

  const readFQ = () => {
    setCrudFQ({
      create: false,
      read: true,
      update: false,
      delete: false,
    });
  };

  const updateFQ = () => {
    setCrudFQ({
      create: false,
      read: false,
      update: true,
      delete: false,
    });
  };

  useEffect(() => {
    dispatch(getAllFrequentQuestions());
  }, []);

  return (
    <div>
      <label htmlFor="">
        Find FQ:{" "}
        <input
          type="text"
          name="ask"
          value={ask}
          onChange={(e) => setAsk(e.target.value)}
        />
      </label>
      <button onClick={findFQ}>FIND</button>
      {frequentAsk && (
        <div>
          <p>Ask: {frequentAsk?.ask}</p>
          <p>Answer: {frequentAsk?.answer}</p>
          {frequentAsk?.id && (
            <button onClick={() => dispatch(deleteFrequentAskById(frequentAsk?.id))}>
              DELETE
            </button>
          )}
          <button onClick={updateFQ}>UPDATE</button>
          {crudFQ.update && (
            <FormFQ
              id={frequentAsk?.id}
              sendInfo={updateFrequentAskById}
              askToUpdate={frequentAsk?.ask}
              answerToUpdate={frequentAsk?.answer}
              crudFQ={crudFQ}
              setCrudFQ={setCrudFQ}
            />
          )}
        </div>
      )}

      <ButtonsFQ createFQ={createFQ} readFQ={readFQ} />

      {crudFQ.create && <FormFQ sendInfo={createFrequentAsk} />}

      {crudFQ.read && allFQ.length && (
        <ListFQ
          list={allFQ}
          updateFQ={updateFQ}
          crudFQ={crudFQ}
          setCrudFQ={setCrudFQ}
        />
      )}
    </div>
  );
};

export default ManageFQ;
