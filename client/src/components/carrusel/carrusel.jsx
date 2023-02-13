import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
//Estilos
const grid = {
  position: "relative",
};
const image = {
  width: "100%",
  height: "30rem",
};
const buttonRight = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: 0,
};
const buttonLeft = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: 0,
};
//Imagenes de prueba
const images = [
  "https://img.freepik.com/vector-premium/bienestar-cuidado-salud_24877-41352.jpg",
  "https://fundacionasispa.org/wp-content/uploads/2021/09/salud-y-bienestar.jpg",
  "https://img.freepik.com/vector-gratis/concepto-conciencia-salud-mental_23-2148516138.jpg",
];
const Carrusel = () => {
  //Creo un estado de index (posicionamiento)
  const [currentIndex, setCurrentIndex] = useState(0);
  //Handlers de laterales
  const handlePrev = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };
  return (
    <Grid container style={grid}>
      <Grid item xs={12}>
        <img src={images[currentIndex]} style={image} alt="gg" />
      </Grid>
      <IconButton style={buttonLeft} onClick={handlePrev}>
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton style={buttonRight} onClick={handleNext}>
        <NavigateNextIcon />
      </IconButton>
    </Grid>
  );
};

export default Carrusel;
