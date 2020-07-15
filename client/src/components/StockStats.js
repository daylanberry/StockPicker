import React from 'react'
import { Table } from 'react-bootstrap'
import './StockStats.css'


const StockStats = ({formatNumber, open, high, low, volume, previous, name}) => {

  return (
    <div className='stock-table'>
      <Table >
        <tbody>
          <tr>
            <td>Open:</td>
            <td>{formatNumber(open)}</td>
          </tr>

          <tr>
            <td>High:</td>
            <td>{formatNumber(high)}</td>
          </tr>

          <tr>
            <td>Low:</td>
            <td>{formatNumber(low)}</td>
          </tr>
        </tbody>
      </Table>

      <Table >
        <tbody>
          <tr>
            <td>Previous:</td>
            <td>{formatNumber(previous)}</td>
          </tr>

          <tr>
            <td>Volume:</td>
            <td>{formatNumber(volume)}</td>
          </tr>

        </tbody>
      </Table>
    </div>
  )
}

export default StockStats


