import React from "react";
import {doctorGetDetail} from "../../../redux/reducers/doctorReducer";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(doctorGetDetail(consulta?.register[0].doctorId));
  }, [consulta]);
  const doctor = useSelector((state) => state.doctor.detail);
  if (!consulta) {
    return <div>No query selected</div>;
  }

  return (
    <div style={padreDiv}>
 
      <Card style={carde}>
        <Typography style={typoTitle}>Date of attention:</Typography>
        <Typography>{consulta.register[0].date}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Hours of operation :
        </Typography>
        <Typography>{consulta.register[0].hour}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Patient :
        </Typography>
        <Typography>{consulta.Patient.name + " "+consulta.Patient.surname}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Reason for consultation :
        </Typography>
        <Typography>{consulta.register[0].reason}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Diagnosis :
        </Typography>
        <Typography>{consulta.register[0].diagnosis}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Prescription :
        </Typography>
        <Typography>{consulta.register[0].prescription}</Typography>
        <Typography style={typoTitle} gutterBottom>
          Doctor :
        </Typography>
        <Typography>{doctor.name + " " + doctor.lastName}</Typography>
      </Card>
    </div>
  );
};
export default DetalleConsulta;
