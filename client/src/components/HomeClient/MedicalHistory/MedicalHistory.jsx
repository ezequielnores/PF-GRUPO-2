import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { historyGetAllbyPatient } from "../../../redux/reducers/historyReducer";
import DetalleConsulta from "./MedicalHistoryDetail";
import MedicalHistoryRecipes from "./MedicalHistoryRecipes";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

//style
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const divPadre = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

//componente
const Historial = ({ consulta }) => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  console.log(id);
  useEffect(() => {
    dispatch(historyGetAllbyPatient(id));
  }, []);

  const [selectedConsulta, setSelectedConsulta] = useState(null);
  // const [adjuntos, setAdjuntos] = useState(false);
  const consultas = useSelector((state) => state.history.list);

  // function handlerAdjuntos() {
  //   setAdjuntos(true);
  // }
  function handleConsultaSelect(event) {
    const consultaIndex = event.target.value;
    setSelectedConsulta(consultas[consultaIndex]);
  }

  return (
    <div style={divPadre}>
      <div>
        <Typography
          variant="button"
          fontSize="2.5rem"
          color="#307196"
          fontWeight="bold"
          style={test}
        >
          Health care history
        </Typography>
      </div>
      <div>
        {/* <Button
          onClick={handlerAdjuntos}
          variant="outlined"
          size="large"
          style={{ marginRight: "5rem", color: "black" }}
        >
          Attachments
        </Button> */}
        <Select
          value=""
          onChange={handleConsultaSelect}
          displayEmpty
          size="small"
          style={{ marginBottom: "2rem" }}
        >
          <MenuItem value="" disabled disableGutters>
            Select a query to view its details
          </MenuItem>
          {consultas?.map((consulta, index) => (
            <MenuItem key={index} value={index} disableGutters>
              Query {index + 1} - {consulta.date}
            </MenuItem>
          ))}
        </Select>
        {/* {adjuntos ? (
          <MedicalHistoryRecipes />
        ) : ( */}
        <DetalleConsulta consulta={selectedConsulta} />
        {/* )} */}
      </div>
    </div>
  );
};
export default Historial;
