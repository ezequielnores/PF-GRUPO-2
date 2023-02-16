import React from "react";
import Carrusel from "./carruselDep/carusel";
import Planes from "./planes/planes";
//mui
const container = {
  display: "flex",
  flexDirection: "column",
};
const landing = () => {
  return (
    <div style={container}>
      <Carrusel />
      <Planes />
    </div>
  );
};

export default landing;
