import { Button, TextField, Typography } from "@mui/material";
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

const FormFQ = ({ id, askToUpdate, answerToUpdate }) => {
  const dispatch = useDispatch();
  const [ask, setAsk] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(
        updateFrequentAskById({ id: id, ask: ask, answer: answer })
      );
      await dispatch(getAllFrequentQuestions());
      alert("FQ UPDATED.");
    } else {
      await dispatch(createFrequentAsk({ ask: ask, answer: answer }));
      await dispatch(getAllFrequentQuestions());
      alert("FQ CREATED.");
    }

    setAsk("");
    setAnswer("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      <Typography fontSize="1.5rem" style={{ marginBottom: "0.5rem" }}>
        {id ? "Update" : "Create"} FQ
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Ask"
          type="text"
          name="ask"
          value={ask}
          onChange={(e) => setAsk(e.target.value)}
          placeholder={askToUpdate ? askToUpdate : "Ask"}
          style={{ width: "35%" }}
        />

        <TextField
          label="Answer"
          type="text"
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={answerToUpdate ? answerToUpdate : "Answer"}
          style={{ width: "35%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <Button type="submit" variant="outlined">
          {id ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default FormFQ;
