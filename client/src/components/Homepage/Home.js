import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel, Card, Button } from 'react-bootstrap'
import { newsApi } from '../../api/keys'
import { useMutation, useQuery } from '@apollo/react-hooks';

import GET_NEWS from '../../queries/getNews'
import NewsCarousel from './NewsCarousel'
import PageLoading from '../PageLoading'
import BuyAnalysis from './BuyAnalysis'
import './Home.css'


const Home = (props) => {


  const { loading, error, data } = useQuery(GET_NEWS)
  const [currentStock, setCurrentStock] = useState('')

  useEffect(() => {
    var stocksArr = ['FB', 'AAPL', 'AMZN', 'GOOGL']

    var initialStockIdx = Math.floor(Math.random() * stocksArr.length)

    setCurrentStock(stocksArr[initialStockIdx])

  }, [])

  const switchTicker = (ticker) => {
    setCurrentStock(ticker)

  }


  if (!data || !data.getNews.length) {
    return <PageLoading />
  }

  return (
    <div className='home-container'>
      <div style={{width: '50%', height: '600px'}}>
        <NewsCarousel data={data}/>
      </div>
      <div style={{width: '50%'}}>
      <BuyAnalysis
        ticker={currentStock}
        switchTicker={switchTicker}
      />
      </div>
    </div>
  )

}

export default Home
