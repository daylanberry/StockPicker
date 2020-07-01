import React from 'react'


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
      <td>${currentPrice * qty}</td>
      <td><button>Transact</button></td>
    </tr>

  )
}

export default StockSummaryEntry