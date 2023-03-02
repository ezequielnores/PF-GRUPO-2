import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createFrequentAsk,
  updateFrequentAskById,
  getAllFrequentQuestions,
} from "../../redux/reducers/frequentQuestionsReducer";
import styled from "styled-components";

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