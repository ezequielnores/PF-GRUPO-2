import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
//style
const padreDiv = {
  width: "50rem",
  display: "flex",
  flexDirection: "column",
};
const carde = {
  padding: "1rem",
  textAlign: "start",
};
const typoTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "3px",
  marginBottom: "3px",
};
const DetalleConsulta = ({ consulta }) => {
  if (!consulta) {
    return <div>No query selected</div>;
  }
  return (
    <div style={padreDiv}>
      <Card style={carde}>
        <Typography style={typoTitle}>Date of attention:</Typography>
        <Typography>{consulta.fecha}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Hours of operation :
        </Typography>
        <Typography>{consulta.hora}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Patient :
        </Typography>
        <Typography>{consulta.paciente}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Reason for consultation :
        </Typography>
        <Typography>{consulta.motivoConsulta}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Diagnosis :
        </Typography>
        <Typography>{consulta.diagnostico}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Treatment :
        </Typography>
        <Typography>{consulta.tratamiento}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Doctor :
        </Typography>
        <Typography>{consulta.medico}</Typography>
      </Card>
    </div>
  );
};
export default DetalleConsulta;
