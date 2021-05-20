import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import img1 from '../images/four.jpg';
import img2 from '../images/five.jpg';
import img3 from '../images/eight.jpg';

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={2000} fade>
      <Carousel.Item>
        <img className="d-block w-100" src={img1} alt="First Slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img2} alt="First Slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img3} alt="First Slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ControlledCarousel;
