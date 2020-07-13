import React from 'react'
import { Table } from 'react-bootstrap'
import StockSummaryEntry from './StockSummaryEntry'
import * as helpers from './utils'

import './AssetTable.css'

const AssetTable = ({stocks, user}) => {

  const totalCalc = () => {
    if (user) {
      const { currentUser } = user
      let totalBalance = stocks.reduce((acc, curr) => {
        return acc + curr.currentPrice * curr.qty
      }, 0)

      return helpers.numberFormatter(totalBalance)
    }
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Current Price</th>
          <th>Cost Per Share</th>
          <th>Quantity</th>
          <th>Gain/Loss</th>
          <th>Current Balance</th>
          <th>Buy/Sell</th>
        </tr>
      </thead>

      <tbody>
        {
          stocks.length ? (
            stocks.map((stock, i) => (
              <StockSummaryEntry
                stock={stock}
                key={i}
              />
            ))
          ) : null
        }

        <tr>
          <td>
            <span className='total'>
              Total
            </span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <span className='total'>
              ${totalCalc()}
            </span>
          </td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  )
}

export default AssetTable