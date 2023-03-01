import React from "react";

const ButtonsFQ = ({ createFQ, readFQ }) => {
    return (
        <div>
            <button onClick={createFQ}>CREATE FQ</button>
            <button onClick={readFQ}>READ FQ</button>
        </div>
    );
};

export default ButtonsFQ;