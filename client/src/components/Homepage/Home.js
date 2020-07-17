import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel, Card, Button } from 'react-bootstrap'
import { newsApi } from '../../api/keys'
import { useMutation, useQuery } from '@apollo/react-hooks';

import GET_NEWS from '../../queries/getNews'
import NewsCarousel from './NewsCarousel'
import PageLoading from '../PageLoading'
import './Home.css'

// useEffect(() => {
//   axios.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApi}`)
//     .then(res => setArticles(res.data.articles))
//     .catch(err => console.log(err))
// }, [])


const Home = (props) => {

  const { loading, error, data } = useQuery(GET_NEWS)
  const [articles, setArticles] = useState([])

  console.log(data)

  if (!data || !data.getNews.length) {
    return <PageLoading />
  }

  return (
    <div className='home-container'>
      <NewsCarousel data={data}/>

      <div className='home-btns'>
        {/* <img
          src='https://wordpress.accuweather.com/wp-content/uploads/2020/05/EXkyP-GWoAIHUxE.jpg'
          style={{width: '100px', height: '50px', marginLeft: '100px'}}

        /> */}
        <button className='btn'>Click</button>
      </div>
    </div>
  )

}

export default Home
