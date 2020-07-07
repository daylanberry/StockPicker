import React from 'react'
import * as helpers from './utils'
import './StockSummaryEntry.css'

const StockSummaryEntry = ({stock: {name, currentPrice, ticker, costPerShare, qty, totalCost}}) => {

  const calcGainLoss = () => {
    let gain = currentPrice * qty - totalCost

    return gain >= 0 ? (
      <span style={{color: 'green'}}>${helpers.numberFormatter(gain)}&#8593;</span>
      ) : (
      <span style={{color: 'red'}}>${helpers.numberFormatter(gain)}&#8595;</span>
    )
  }

  return (
    <tr>
      <td>
        <div>
          <span style={{color: '#8d4900', fontSize: '22px'}}>
            {ticker}
          </span>
        </div>
        <div>
          <span style={{fontSize: '14px'}}>
            {name}
          </span>
        </div>
      </td>
      <td>${helpers.numberFormatter(currentPrice)}</td>
      <td>${helpers.numberFormatter(costPerShare)}</td>
      <td>{qty}</td>
      <td>{calcGainLoss()}</td>
      <td>${helpers.numberFormatter(currentPrice * qty)}</td>
      <td><button>Transact</button></td>
    </tr>

  )
}

export default StockSummaryEntry