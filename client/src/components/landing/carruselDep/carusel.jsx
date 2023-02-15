import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./item";
import slider from "./slider.json";

function Example() {
  return (
    <Carousel height="25rem" animation="fade">
      {slider.map((item, i) => (
        <Item key={item.id} item={item} />
      ))}
    </Carousel>
  );
}

export default Example;
