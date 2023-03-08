import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteFrequentAskById,
  getAllFrequentQuestions,
} from "../../redux/reducers/frequentQuestionsReducer";
import FormFQ from "./FormFQ";
import stylede from "@emotion/styled";
import { Button, Card, Typography } from "@mui/material";

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
const ScrollableContainer = stylede.div`
display:flex;
flex-direction:column;
  max-height: 600px;
  overflow: auto;
  margin-top: 1rem;
  gap:1rem;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #307196;
  }
`;
const divComments = {
  width: "80rem",
};
const divsinHijin = {
  width: "98%",
  margin: "auto",
  transition: "0.3s",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  paddingTop: "1rem",
  paddingBottom: "1rem",
};
const ListFQ = ({ list }) => {
  const dispatch = useDispatch();
  const [renderForm, setRenderForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleClick = (id) => {
    setSelectedItemId(id);
    setRenderForm(true);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginTop: "0.5rem",
      }}
    >
      <Card style={divComments}>
        <ScrollableContainer>
          {list.map((i) => {
            return (
              <div key={i?.id} style={divsinHijin}>
                <Typography
                  variant="button"
                  fontWeight="bold"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "1rem",
                  }}
                >
                  Frequent Ask:
                  <Typography style={{ marginTop: "0.5rem" }}>
                    {i?.ask}
                  </Typography>
                </Typography>
                <Typography
                  variant="button"
                  fontWeight="bold"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "1rem",
                  }}
                >
                  Answer:
                  <Typography style={{ marginTop: "0.5rem" }}>
                    {i?.answer}
                  </Typography>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                >
                  {i?.id && (
                    <Button
                      variant="outlined"
                      onClick={async () => {
                        await dispatch(deleteFrequentAskById(i?.id));
                        await dispatch(getAllFrequentQuestions());
                      }}
                    >
                      DELETE
                    </Button>
                  )}
                  <Button variant="outlined" onClick={() => handleClick(i?.id)}>
                    UPDATE
                  </Button>
                </div>
                <div>
                  {selectedItemId === i?.id && renderForm && (
                    <FormFQ
                      id={i?.id}
                      askToUpdate={i?.ask}
                      answerToUpdate={i?.answer}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </ScrollableContainer>
      </Card>
    </div>
  );
};

export default ListFQ;
