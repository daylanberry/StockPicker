import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'


const NewsCarousel = ({articles}) => {

  const [index, setIndex] = useState(1);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={articles[1].urlToImage}
        />
        <Carousel.Caption>
          <h3>{articles[1].title}</h3>
          <p>{articles[1].description}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={articles[2].urlToImage}
          alt="Third slide"
        />
        <Carousel.Caption>
          <div style={{backgroundColor: 'black',opacity: '60%'}}>
            <h3>{articles[2].title}</h3>
            <p>{articles[2].description}</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default NewsCarousel


