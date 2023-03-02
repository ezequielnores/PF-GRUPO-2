import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createFrequentAsk,
  updateFrequentAskById,
  getAllFrequentQuestions,
} from "../../redux/reducers/frequentQuestionsReducer";
// import styled from "styled-components";

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: 20px;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Label = styled.label`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 10px;
// `;

// const Input = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 16px;
//   margin-top: 5px;
// `;

// const Button = styled.button`
//   background-color: #4CAF50;
//   border: none;
//   color: white;
//   padding: 10px 20px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   margin-top: 10px;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #3e8e41;
//   }
// `;

// const Heading = styled.h2`
//   margin-bottom: 20px;
// `;

const FormFQ = ({
  id,
  askToUpdate,
  answerToUpdate,
}) => {
  const dispatch = useDispatch();
  const [ask, setAsk] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateFrequentAskById({ id: id, ask: ask, answer: answer }));
      dispatch(getAllFrequentQuestions());
      alert("FQ UPDATED.");
    } else {
      dispatch(createFrequentAsk({ ask: ask, answer: answer }));
      dispatch(getAllFrequentQuestions());
      alert("FQ CREATED.");
    }

    setAsk("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Update" : "Create"} FQ</h2>

      <label htmlFor="">
        Ask:{" "}
        <input
          type="text"
          name="ask"
          value={ask}
          onChange={(e) => setAsk(e.target.value)}
          placeholder={askToUpdate ? askToUpdate : "Ask"}
        />
      </label>

      <label htmlFor="">
        Answer:{" "}
        <input
          type="text"
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={answerToUpdate ? answerToUpdate : "Answer"}
        />
      </label>

      <button type="submit">{id ? "Update" : "Create"}</button>
    </form>
  );
};

export default FormFQ;
