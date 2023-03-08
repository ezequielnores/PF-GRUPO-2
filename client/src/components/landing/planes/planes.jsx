import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { padreTarjeta } from "./planess";
import { styled } from "@mui/material/styles";

//styles
const StyledCards = styled(Card)({
  width: "22rem",
  height: "24rem",
  boxShadow:
    "10px 10px 0px #307196, 20px 20px 0px rgba(48, 113, 150, 0.7), 30px 30px 0px rgba(48, 113, 150, 0.4), 40px 40px 0px rgba(48, 113, 150, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
  },
});
const hijoTarjeta = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  height: "30rem",
};
const dinero = {
  fontWeight: "bold",
  backgroundColor: "white",
  width: "9rem",
  position: "absolute",
  top: "38%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow:
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  borderRadius: "3px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  height: "2.2rem",
};
const dineroFinal = {
  height: "2.2rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  fontWeight: "bold",
  backgroundColor: "white",
  width: "9rem",
  position: "absolute",
  top: "32%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow:
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  borderRadius: "3px",
};
const Planes = () => {
  return (
    <div style={padreTarjeta}>
      <div style={hijoTarjeta}>
        <StyledCards>
          <div style={{ width: "100%", position: "relative" }}>
            <Typography
              style={{
                backgroundColor: "#307196",
                width: "100%",
                height: "7rem",
                color: "#F9F9FB",
                fontWeight: "bold",
                fontFamily: "monospace",
                fontSize: "2.5rem",
                borderBottomLeftRadius: "3rem",
                borderBottomRightRadius: "3rem",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                paddingTop: "0.5rem",
              }}
            >
              iCare 360
            </Typography>
            <div>
              <Typography variant="body1" color="#058d8d" style={dinero}>
                $
                <Typography variant="h5" color="#058d8d">
                  3000
                </Typography>
              </Typography>
            </div>

            {/* <Typography
              variant="h5"
              style={{ marginBottom: "1rem", marginTop: "3rem" }}
            >
              Includes
            </Typography> */}
            <div style={{ marginBottom: "1rem", marginTop: "5rem" }}>
              <ListItem>✔️ 4 Consultations with specialists</ListItem>
              <ListItem>✔️ 2 Monthly guards</ListItem>
            </div>
          </div>
        </StyledCards>
        <StyledCards>
          <div style={{ width: "100%", position: "relative" }}>
            <Typography
              style={{
                backgroundColor: "#307196",
                width: "100%",
                height: "7rem",
                color: "#F9F9FB",
                fontWeight: "bold",
                fontFamily: "monospace",
                fontSize: "2.5rem",
                borderBottomLeftRadius: "3rem",
                borderBottomRightRadius: "3rem",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                paddingTop: "0.5rem",
              }}
            >
              iCare Guard
            </Typography>
            <div>
              <Typography variant="body1" color="#058d8d" style={dinero}>
                $
                <Typography variant="h5" color="#058d8d">
                  1000
                </Typography>
              </Typography>
            </div>
            {/* <Typography
              variant="h5"
              component="p"
              style={{ marginBottom: "1rem", marginTop: "3rem" }}
            >
              Includes
            </Typography> */}
            <div style={{ marginBottom: "1rem", marginTop: "5rem" }}>
              <ListItem>✔️ 1 Consultation with specialist</ListItem>
              <ListItem>✔️ 5 Monthly guards</ListItem>
            </div>
          </div>
        </StyledCards>
        <StyledCards>
          <div style={{ width: "100%", position: "relative" }}>
            <Typography
              style={{
                backgroundColor: "#307196",
                width: "100%",
                height: "7rem",
                color: "#F9F9FB",
                fontWeight: "bold",
                fontFamily: "monospace",
                fontSize: "2.5rem",
                borderBottomLeftRadius: "3rem",
                borderBottomRightRadius: "3rem",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                paddingTop: "0.5rem",
              }}
            >
              iCare Full
            </Typography>
            <div>
              <Typography variant="body1" color="#058d8d" style={dineroFinal}>
                $
                <Typography variant="h5" color="#058d8d">
                  4000
                </Typography>
              </Typography>
            </div>
            <div style={{ marginBottom: "1rem", marginTop: "5rem" }}>
              <ListItem>✔️ 4 Consultations with specialists</ListItem>
              <ListItem>✔️ All the guards you need</ListItem>
              <ListItem>✔️ Valid semiannual payment</ListItem>
            </div>
          </div>
        </StyledCards>
      </div>
    </div>
  );
};

export default Planes;
