import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteFrequentAskById,
  getAllFrequentQuestions,
} from "../../redux/reducers/frequentQuestionsReducer";
import FormFQ from "./FormFQ";
// import styled from "styled-components";

// const StyledListFQ = styled.div`
//   h4 {
//     color: #333;
//     font-size: 24px;
//     font-weight: bold;
//   }
  
//   ul {
//     list-style-type: none;
//     padding: 0;
//   }
  
//   li {
//     margin-bottom: 16px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     padding: 16px;
//   }
  
//   p {
//     margin: 0;
//     font-size: 16px;
//   }
  
//   button {
//     margin-right: 8px;
//     padding: 8px 16px;
//     background-color: #333;
//     color: #fff;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//   }
  
//   button:hover {
//     background-color: #444;
//   }
// `;

const ListFQ = ({ list, crudFQ, setCrudFQ }) => {
  const dispatch = useDispatch();
  const [renderForm, setRenderForm] = useState(false);
  const [renderList, setRenderList] = useState(false);
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
                    dispatch(getAllFrequentQuestions());
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
