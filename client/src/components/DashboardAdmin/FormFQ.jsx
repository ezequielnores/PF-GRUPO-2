import React, { useState } from "react";
import { useDispatch } from "react-redux";

const FormFQ = ({
  sendInfo,
  id,
  askToUpdate,
  answerToUpdate,
  crudFQ,
  setCrudFQ,
}) => {
  const dispatch = useDispatch();
  const [ask, setAsk] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(sendInfo(id, { ask: ask, answer: answer })).then(() => alert("FQ UPDATED."));
    //   alert("FQ UPDATED.");
    } else {
      dispatch(sendInfo({ ask: ask, answer: answer })).then(() => alert("FQ CREATED."));
    //   alert("FQ CREATED.");
    }

    setAsk("");
    setAnswer("");

    setTimeout(setCrudFQ, 6000, { crudFQ, create: false, update: false });
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
