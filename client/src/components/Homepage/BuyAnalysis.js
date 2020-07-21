import React, { useEffect, useState } from 'react'
import { finnhub } from '../../api/keys'
import axios from 'axios'

import { Button, Dropdown } from 'react-bootstrap'
import PeriodHeader from './PeriodHeader'
import AnalysisTable from './AnalysisTable'
import ErrorMessage from '../ErrorMessage'
import SearchAnalysis from './SearchAnalysis'
import Loading from '../Loading'
import './BuyAnalysis.css'


const BuyOrSell = ({ticker, switchTicker}) => {

  const [stockAnalysis, setStockAnalysis] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [error, setError] = useState('')


  useEffect(() => {

    axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${ticker}&token=${finnhub}`)
      .then(res => {
        if (res.data.length) {
          setError('')
          setStockAnalysis(res.data.slice(0, 3))
        } else {
          setError('This is not a valid ticker')
        }
      })

  }, [ticker])

  const changePeriod = (i) => {
    setCurrentIdx(i)
  }


  return (
    <div className='buy-sell-table'>

      <PeriodHeader
        ticker={ticker}
        stockAnalysis={stockAnalysis}
        currentIdx={currentIdx}
        changePeriod={changePeriod}
      />

      <div style={{marginBottom: '10px'}}>
        {
          stockAnalysis[currentIdx] ?
          <AnalysisTable
            stock={!error.length ? stockAnalysis[currentIdx] : {buy: 0, hold: 0, sell: 0, strongBuy: 0, strongSell: 0} }

          /> : <Loading />
        }
      </div>
        <div style={{display: 'flex'}}>
          <SearchAnalysis switchTicker={switchTicker}/>
        </div>
          {
            error.length ? <ErrorMessage error={error}/> : null
          }
    </div>
  )
}

export default BuyOrSell