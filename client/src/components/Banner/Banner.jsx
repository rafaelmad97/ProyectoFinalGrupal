import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import slider from "../../slider.json";

function Banner() {
  return (
    <Carousel>
      {slider.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Carousel>
  );
}

export default Banner;
