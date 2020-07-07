import React from 'react'
import * as helpers from './utils'

const StockSummaryEntry = ({stock: {name, currentPrice, ticker, costPerShare, qty, totalCost}}) => {


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
      <td>${currentPrice}</td>
      <td>${costPerShare}</td>
      <td>{qty}</td>
      <td>alot</td>
      <td>${helpers.numberFormatter(currentPrice * qty)}</td>
      <td><button>Transact</button></td>
    </tr>

  )
}

export default StockSummaryEntry