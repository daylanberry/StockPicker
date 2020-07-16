import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel, Card } from 'react-bootstrap'
import { newsApi } from '../../api/keys'

import Loading from '../Loading'
import NewsCarousel from './NewsCarousel'
import './Home.css'


const Home = (props) => {

  const [articles, setArticles] = useState([])

  useEffect(() => {

    // axios.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApi}`)
    //   .then(res => setArticles(res.data.articles))
    //   .catch(err => console.log(err))
  }, [])

  return (
    <div className='home-container'>
      {
        articles.length ? <NewsCarousel articles={articles}/> : null
      }

      hi

    </div>
  )

}

export default Home
