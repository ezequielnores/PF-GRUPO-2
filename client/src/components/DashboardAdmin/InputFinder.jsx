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
    <div>
          <label htmlFor="">Find {inputTitle} by {findBy}</label>
          <input
            type={inputType}
            name={inputName}
            value={inputValue}
            onChange={inputOnChange}
          />
          <button onClick={inputOnClick}>Find {inputTitle}</button>
        </div>
  );
};

export default InputFinder;
