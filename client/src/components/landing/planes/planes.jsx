import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { padreTarjeta } from "./planess";
const hijoTarjeta = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  height: "30rem",
};
const Planes = () => {
  return (
    <div style={padreTarjeta}>
      <div style={hijoTarjeta}>
        <Card style={{ width: "22rem", height: "20rem" }}>
          <div style={{ width: "100%" }}>
            <Typography
              style={{
                backgroundColor: "#0066b2",
                width: "100%",
                color: "#F9F9FB",
                fontWeight: "bold",
                fontFamily: "monospace",
                fontSize: "2.5rem",
              }}
            >
              iCare 360
            </Typography>
            <Typography variant="h6" color="green">
              $3000
            </Typography>
            <Typography component="p">Incluye</Typography>
            <ListItem style={{ display: "list-item" }}>
              4 Consultas con especialistas
            </ListItem>
            <ListItem style={{ display: "list-item" }}>
              2 Guardias mensuales
            </ListItem>
          </div>
        </Card>
        <Card style={{ width: "22rem", height: "20rem" }}>
          <div style={{ width: "100%" }}>
            <Typography
              style={{
                backgroundColor: "#0066b2",
                width: "100%",
                color: "#F9F9FB",
                fontWeight: "bold",
                fontFamily: "monospace",
                fontSize: "2.5rem",
              }}
            >
              iCare Guardia
            </Typography>
            <Typography variant="h6" color="green">
              $1000
            </Typography>
            <Typography variant="body1" component="p">
              Incluye:
            </Typography>
            <ListItem style={{ display: "list-item" }}>
              5 Guardias mensuales
            </ListItem>
            <ListItem style={{ display: "list-item" }}>
              1 Consulta con especialista
            </ListItem>
          </div>
        </Card>
        <Card style={{ width: "22rem", height: "20rem" }}>
          <div style={{ width: "100%" }}>
            <Typography
              style={{
                backgroundColor: "#0066b2",
                width: "100%",
                color: "#F9F9FB",
                fontWeight: "bold",
                fontFamily: "monospace",
                fontSize: "2.5rem",
              }}
            >
              iCare Full
            </Typography>
            <Typography variant="h6" color="green">
              $4000
            </Typography>
            <Typography variant="body1" component="p">
              Incluye:
            </Typography>
            <ListItem style={{ display: "list-item" }}>
              4 Consultas con especialistas
            </ListItem>
            <ListItem style={{ display: "list-item" }}>
              Todas las Guardias que necesites
            </ListItem>
            <ListItem style={{ display: "list-item" }}>
              Valido pago semestral
            </ListItem>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Planes;
