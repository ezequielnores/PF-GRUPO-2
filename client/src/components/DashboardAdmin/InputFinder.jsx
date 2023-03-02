import { Button, TextField } from "@mui/material";
import React from "react";

const InputFinder = ({
  findBy,
  inputTitle,
  inputType,
  inputName,
  inputValue,
  inputOnChange,
  inputOnClick,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {/* <label htmlFor="">
        Find {inputTitle} by {findBy}:{" "} */}
      <TextField
        label={`Find comment by ${findBy}`}
        size="small"
        type={inputType}
        name={inputName}
        value={inputValue}
        onChange={inputOnChange}
        style={{ width: "20rem" }}
      />
      {/* </label> */}
      <Button onClick={inputOnClick}>Find {inputTitle}</Button>
    </div>
  );
};

export default InputFinder;
