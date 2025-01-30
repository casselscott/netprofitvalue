import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap"; // Assuming you're using React-Bootstrap for the carousel

// Dynamically import all images from the /assets/images/ folder
const images = require.context("../images", false, /\.(jpg|jpeg|png|gif)$/);
const CarouselComponent = () => {
  return (
    <Carousel>
      {images.keys().map((imagePath, index) => {
        // Get the actual image URL
        const image = images(imagePath);
        return (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={image} alt={`Slide ${index}`} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselComponent;
