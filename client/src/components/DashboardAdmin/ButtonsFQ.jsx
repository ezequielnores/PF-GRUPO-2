import React from "react";
import { Button, TextField, Typography } from "@mui/material";

// import styled from "styled-components";

// const ButtonsContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 20px;
// `;

// const Button = styled.button`
//   background-color: #f8f8f8;
//   border: none;
//   border-radius: 3px;
//   color: #222;
//   cursor: pointer;
//   font-size: 1rem;
//   margin-right: 10px;
//   padding: 8px 16px;
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     background-color: #222;
//     color: #f8f8f8;
//   }
// `;

const ButtonsFQ = ({ createFQ, readFQ, read, create }) => {
  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        justifyContent: "center",
      }}
    >
      <Button onClick={createFQ}>{create ? "Hide create" : "Create"} FQ</Button>
      <Button onClick={readFQ}>{read ? "Hide" : "Read"} FQ</Button>
    </div>
  );
};

export default ButtonsFQ;
