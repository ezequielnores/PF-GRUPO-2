import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteFrequentAskById,
} from "../../redux/reducers/frequentQuestionsReducer";
import FormFQ from "./FormFQ";

const ListFQ = ({ list, updateFQ, crudFQ, deleteFQ, setCrudFQ }) => {
  const dispatch = useDispatch();
  const [renderForm, setRenderForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleClick = (id) => {
    setSelectedItemId(id);
    setRenderForm(true);
  };

  return (
    <div>
      <h4>FQ's:</h4>
      <ul>
        {list.map((i) => {
          return (
            <li key={i?.id}>
              <p>Frequent Ask: {i?.ask}</p>
              <p>Answer: {i?.answer}</p>
              {i?.id && (
                <button
                  onClick={() => {
                    dispatch(deleteFrequentAskById(i?.id));
                    deleteFQ();
                    setCrudFQ({ crudFQ, read: true });
                  }}
                >
                  DELETE
                </button>
              )}
              <button onClick={() => handleClick(i?.id)}>UPDATE</button>
              <div>
                {selectedItemId === i?.id && renderForm && (
                  <FormFQ
                    id={i?.id}
                    askToUpdate={i?.ask}
                    answerToUpdate={i?.answer}
                    updateFQ={setRenderForm}
                    render={renderForm}
                    setCrudFQ={setCrudFQ}
                    crudFQ={crudFQ}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListFQ;
