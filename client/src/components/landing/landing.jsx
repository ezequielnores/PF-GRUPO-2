import React from "react";
import Carrusel from "./carruselDep/carusel";
import Planes from "./planes/planes";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContenidoChat from '../ChatBot/ChatBot.jsx';

//mui
const container = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
};
const hijoContainer = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
};
const textContainer = {
  display: "flex",
  flexDirection: "column",
  width: "50%",
  justifyContent: "center",
};
const carru = {
  width: "50%",
  marginRight: "4rem",
  marginTop: "4rem",
/*   marginBottom: "1rem" */
};
const textoMarca = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};
const Landing = () => {
const navigate = useNavigate()

  return (
    <div style={container}>
      <div style={hijoContainer}>
        <div style={textContainer}>
          <div style={textoMarca}>
            <Typography variant="h1" style={{ color: "#43B8C8" }}>
              i
            </Typography>
            <Typography variant="h1" style={{ color: /* "#307196" */"black" }}>
              Care
            </Typography>
          </div>
          <Typography variant="h5" color="text.secondary">
            Online health services
          </Typography>
          <Button onClick={()=> navigate('/register')} style={{ marginTop: "2rem", fontSize: "15px" }}>
            Register client
          </Button>
        </div>
        <div style={carru}>
          <Carrusel />
        </div>
      </div>
      <Planes />
      <div>
      <ContenidoChat/>
    </div>
    </div>
  );
};

export default Landing;
