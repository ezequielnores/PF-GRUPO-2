import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//styles
const imgContainer = {
  width: "50%",
  height: "40vh",
};
const divContainer = {
  height: "45vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
};
const container = {
  width: "100%",
  height: "100vh",
  backgroundColor: "#f7f7f7",
};
const divText = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  marginLeft: "10px",
  paddingLeft: "20rem",
  paddingRight: "20rem",
};
const finaldivText = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  width: "50rem",
  marginLeft: "3rem",
  marginRight: "3rem",
};
//component
const services = () => {
  return (
    <div style={container}>
      <Box>
        <div style={divContainer}>
          <Box
            component="img"
            style={imgContainer}
            alt="The house from the offer."
            src="https://www.beauty-forum.com/typo3temp/pics/heilpraktike_c179cae73e.jpg"
          />
          <div style={divText}>
            <Typography
              align="justify"
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "2.2rem",
              }}
            >
              Guardia Online
            </Typography>
            <Typography align="justify">
              Accede a los mejores profesionales de la salud. Realiza
              videollamadas de guardia, sin restricciones de horario, los 7 días
              de la semana, 365 días del año.
            </Typography>
          </div>
        </div>
        <div style={divContainer}>
          <div style={finaldivText}>
            <Typography
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "2.2rem",
              }}
            >
              Especialista online y presencial
            </Typography>
            <Typography align="justify">
              Los mejores especialistas de nuestra servicio a solo un click de
              distancia. Acceda a las agendas disponibles de los
              profesionales,tanto presencial como virtual, seleccione una fecha
              acorde a tus necesidades ¡y listo!
            </Typography>
          </div>
          <Box
            component="img"
            style={imgContainer}
            alt="The house from the offer."
            src="https://www.pngkit.com/png/detail/428-4285944_-.png"
          />
          <div style={finaldivText}>
            <Typography
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "2.2rem",
              }}
            >
              Testeo rapido de Covid
            </Typography>
            <Typography align="justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum,
              sunt explicabo, ea expedita facere quia nobis suscipit corrupti
              ipsum totam qui iusto impedit accusamus, ipsam doloribus voluptate
              fugit atque beatae!
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default services;
