import React from "react";
import Carousel from "react-material-ui-carousel";
import Carousel1 from "../../assets/carousel1.png";
import Carousel2 from "../../assets/carousel2.png";
import Carousel3 from "../../assets/carousel3.png";
import Carousel4 from "../../assets/carousel4.png";
import "./Carousel.css";

export function CustomCarousel() {
  return (
    <div className="main">
      <Carousel>
        <img className="carousel" src={Carousel1} alt="1" />
        <img className="carousel" src={Carousel2} alt="2" />
        <img className="carousel" src={Carousel3} alt="3" />
        <img className="carousel" src={Carousel4} alt="4" />
      </Carousel>
    </div>
  );
}
