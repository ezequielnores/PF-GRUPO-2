import React, { useState } from "react";
import DetalleConsulta from "./MedicalHistoryDetail";
import MedicalHistoryRecipes from "./MedicalHistoryRecipes";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

// Datos ejemplo
const consultas = [
  { fecha: "2022-01-01", medico: "Julian Pérez", diagnostico: "Gripe" },
  {
    fecha: "2022-02-15",
    hora: "14:00",
    paciente: "Kevin",
    tratamiento: "PARACETAMOL.1 gr VO cada 8hs",
    motivoConsulta:
      "Sospecha de covid.Tos.Fiebre.Dolor de garganta.Dolor de cabeza.Dolor de espalda.Congestión Nasal.Nauseas.Tos.Fiebre o escalofríos.odinofagia.cefalea.nauseas/vómitos.lumbalgia.disnea.contacto estrecho.mialgias.",
    medico: "Jose josesito",
    diagnostico: "INESP Confirmado COVID19 x epidemiol",
  },
  {
    fecha: "2022-03-20",
    medico: "Juansito Garcia",
    diagnostico: "Presión alta",
  },
];
//style
const divPadre = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

//componente
const Historial = ({ consulta }) => {
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [adjuntos, setAdjuntos] = useState(false);

  function handlerAdjuntos() {
    setAdjuntos(true);
  }
  function handleConsultaSelect(event) {
    const consultaIndex = event.target.value;
    setSelectedConsulta(consultas[consultaIndex]);
    setAdjuntos(false);
  }

  return (
    <div style={divPadre}>
      <div>
        <Typography
          variant="h2"
          gutterBottom
          style={{
            color: "#147bf4",
            fontWeight: "bold",
            fontSize: "2.5rem",
          }}
        >
          Health care history
        </Typography>
      </div>
      <div>
        <Button
          onClick={handlerAdjuntos}
          variant="outlined"
          size="large"
          style={{ marginRight: "5rem", color: "black" }}
        >
          Attachments
        </Button>
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
          {consultas.map((consulta, index) => (
            <MenuItem key={index} value={index} disableGutters>
              Query {index + 1} - {consulta.fecha}
            </MenuItem>
          ))}
        </Select>
        {adjuntos ? (
          <MedicalHistoryRecipes />
        ) : (
          <DetalleConsulta consulta={selectedConsulta} />
        )}
      </div>
    </div>
  );
};
export default Historial;
