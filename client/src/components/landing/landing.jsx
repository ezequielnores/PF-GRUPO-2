import React from "react";
import Navbar from "./navbar/navBar";
import Footer from "./footer/footer";
import Carrusel from "./carruselDep/carusel";
import Planes from "./planes/planes";
//mui
const landing = () => {
  return (
    <>
      <Navbar />
      <Carrusel />
      <Planes />
      <Footer />
    </>
  );
};

export default landing;
