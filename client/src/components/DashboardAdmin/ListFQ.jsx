import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteFrequentAskById,
  updateFrequentAskById,
} from "../../redux/reducers/frequentQuestionsReducer";
import FormFQ from "./FormFQ";

const ListFQ = ({ list, updateFQ, crudFQ, setCrudFQ }) => {
  const dispatch = useDispatch();

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
                <button onClick={() => dispatch(deleteFrequentAskById(i?.id))}>
                  DELETE
                </button>
              )}

              <button onClick={updateFQ}>UPDATE</button>
              {crudFQ.update && (
                <FormFQ
                  id={i?.id}
                  sendInfo={updateFrequentAskById}
                  askToUpdate={i?.ask}
                  answerToUpdate={i?.answer}
                  crudFQ={crudFQ}
                  setCrudFQ={setCrudFQ}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListFQ;
