import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFrequentQuestions,
  deleteFrequentAskById,
} from "../../redux/reducers/frequentQuestionsReducer";
import ButtonsFQ from "./ButtonsFQ";
import FormFQ from "./FormFQ";
import ListFQ from "./ListFQ";
// import styled from "styled-components";

// const StyledManageFQ = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   label {
//     font-size: 1.2rem;
//     margin-bottom: 1rem;
//   }

//   input {
//     padding: 0.5rem;
//     margin-right: 0.5rem;
//     border: none;
//     border-bottom: 2px solid gray;
//     font-size: 1.2rem;
//     outline: none;
//   }

//   button {
//     padding: 0.5rem 1rem;
//     margin-right: 1rem;
//     border: none;
//     border-radius: 0.25rem;
//     background-color: #0077b6;
//     color: white;
//     font-size: 1.2rem;
//     cursor: pointer;
//   }

//   p {
//     margin: 0.5rem 0;
//     font-size: 1.2rem;
//   }

//   div {
//     margin-top: 1rem;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }
// `;

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
      create: !crudFQ.create,
      read: false,
      update: false,
      delete: false,
    });
  };

  const readFQ = () => {
    setCrudFQ({
      create: false,
      read: !crudFQ.read,
      update: false,
      delete: false,
    });
  };

  const updateFQ = () => {
    setCrudFQ({
      create: false,
      read: false,
      update: !crudFQ.update,
      delete: false,
    });
  };

  const deleteFQ = () => {
    setCrudFQ({
      create: false,
      read: false,
      update: false,
      delete: !crudFQ.delete,
    });
  };

  useEffect(async () => {
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
            <button
              onClick={() => {
                dispatch(deleteFrequentAskById(frequentAsk?.id));
                setFrequentAsk(false);
              }}
            >
              DELETE
            </button>
          )}
          <button onClick={updateFQ}>UPDATE</button>
          {crudFQ.update && (
            <FormFQ
              id={frequentAsk?.id}
              askToUpdate={frequentAsk?.ask}
              answerToUpdate={frequentAsk?.answer}
            />
          )}
        </div>
      )}

      <ButtonsFQ
        createFQ={createFQ}
        readFQ={readFQ}
        read={crudFQ.read}
        create={crudFQ.create}
      />

      {crudFQ.create && <FormFQ createFQ={createFQ} />}

      {crudFQ.read && allFQ.length && (
        <ListFQ
          list={allFQ}
          updateFQ={updateFQ}
          crudFQ={crudFQ}
          deleteFQ={deleteFQ}
          setCrudFQ={setCrudFQ}
        />
      )}
    </div>
  );
};

export default ManageFQ;
