import React, { useState } from 'react'
import './NewsCarousel.css'
import { Carousel } from 'react-bootstrap'

const NewsCarousel = ({data: { getNews }}) => {

  const [index, setIndex] = useState(1);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      style={{width: '100%', marginTop: '20px'}}
    >
      {
        getNews.map(article => (
          <Carousel.Item
            style={{justifyContent: 'center'}}
            key={article.title}
          >
            <img
              className="news-img d-block w-100 h-200"
              src={article.urlToImage}
            />
            <Carousel.Caption style={{width: '70%', height: '60%', marginBottom: '40px'}}>
              <div
                style={{backgroundColor: 'black', opacity: '70%'}}
              >
                <h5>{article.title}</h5>
                <a
                  className='read-more'
                  href={article.url}
                >
                  Read More
                </a>
              </div>
            </Carousel.Caption>
            <div>
              {article.description}
            </div>
          </Carousel.Item>
          )
        )
      }

    </Carousel>
  )
}

export default NewsCarousel


