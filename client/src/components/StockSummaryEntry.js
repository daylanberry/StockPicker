import React from 'react'
import * as helpers from './utils'
import { withRouter } from 'react-router-dom'
import './StockSummaryEntry.css'
import { Dropdown } from 'react-bootstrap'

const StockSummaryEntry = ({history, stock: {name, currentPrice, ticker, costPerShare, qty, totalCost}}) => {

  const calcGainLoss = () => {
    let gain = currentPrice * qty - totalCost

    return gain >= 0 ? (
      <span style={{color: 'green'}}>${helpers.numberFormatter(gain)}&#8593;</span>
      ) : (
      <span style={{color: 'red'}}>${helpers.numberFormatter(gain)}&#8595;</span>
    )
  }

  const quoteOrBuyScreen = (input) => {

    history.push({
      pathname: `/search`,
      state: {
        stock: {
          name,
          price: currentPrice,
          ticker
        },
        buy: input
      }
    })
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
      <td>
        <Dropdown >
          <Dropdown.Toggle variant='secondary'>
            Transact
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => quoteOrBuyScreen(true)}>Buy</Dropdown.Item>
            <Dropdown.Item onClick={() => quoteOrBuyScreen(false)}>Sell</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>

  )
}

export default withRouter(StockSummaryEntry)