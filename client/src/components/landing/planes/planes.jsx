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
const tarjetitas = {
  width: "22rem",
  height: "20rem",
  boxShadow: "box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)",
};
const Planes = () => {
  return (
    <div style={padreTarjeta}>
      <div style={hijoTarjeta}>
        <Card style={tarjetitas}>
          <div style={{ width: "100%" }}>
            <Typography
              style={{
                backgroundColor: "#307196",
                width: "100%",
                color: "#F9F9FB",
                fontWeight: "bold",
                fontFamily: "monospace",
                fontSize: "2.5rem",
              }}
            >
              iCare 360
            </Typography>
            <Typography
              variant="h6"
              color="green"
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              $3000
            </Typography>
            <Typography variant="h5" style={{ marginBottom: "1rem" }}>
              Includes
            </Typography>
            <ListItem style={{ display: "list-item" }}>
              4 Consultations with specialists
            </ListItem>
            <ListItem style={{ display: "list-item" }}>
              2 Monthly guards
            </ListItem>
          </div>
        </Card>
        <Card style={tarjetitas}>
          <div style={{ width: "100%" }}>
            <Typography
              style={{
                backgroundColor: "#307196",
                width: "100%",
                color: "#F9F9FB",
                fontWeight: "bold",
                fontFamily: "monospace",
                fontSize: "2.5rem",
              }}
            >
              iCare Guard
            </Typography>
            <Typography
              variant="h6"
              color="green"
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              $1000
            </Typography>
            <Typography
              variant="h5"
              component="p"
              style={{ marginBottom: "1rem" }}
            >
              Includes
            </Typography>
            <ListItem style={{ display: "list-item" }}>
              5 Monthly guards
            </ListItem>
            <ListItem style={{ display: "list-item" }}>
              1 Consultation with specialist
            </ListItem>
          </div>
        </Card>
        <Card style={tarjetitas}>
          <div style={{ width: "100%" }}>
            <Typography
              style={{
                backgroundColor: "#307196",
                width: "100%",
                color: "#F9F9FB",
                fontWeight: "bold",
                fontFamily: "monospace",
                fontSize: "2.5rem",
              }}
            >
              iCare Full
            </Typography>
            <Typography
              variant="h6"
              color="green"
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              $4000
            </Typography>
            <Typography
              variant="h5"
              component="p"
              style={{ marginBottom: "1rem" }}
            >
              Includes
            </Typography>
            <ListItem style={{ display: "list-item" }}>
              4 Consultations with specialists
            </ListItem>
            <ListItem style={{ display: "list-item" }}>
              All the guards you need
            </ListItem>
            <ListItem style={{ display: "list-item" }}>
              Valid semiannual payment
            </ListItem>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Planes;
