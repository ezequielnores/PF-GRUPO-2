import React from "react";
import styled from "styled-components";

const ButtonsFQ = ({ createFQ, readFQ, read, create}) => {
    return (
        <div>
            <button onClick={createFQ}>{create ? "Hide create" : "Create"} FQ</button>
            <button onClick={readFQ}>{read ? "Hide" : "Read"} FQ</button>
        </div>
    );
};

export default ButtonsFQ;