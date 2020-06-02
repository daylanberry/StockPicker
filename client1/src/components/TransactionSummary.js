import React from 'react'
import { Table, Button } from 'react-bootstrap'
import './TransactionSummary.css'


const TransactionSummary = ({quote, qty}) => {


  return (
    <div className='transaction'>
      <h4>Transaction Summary</h4>
      <div className='stock-table'>
        <Table>
          <tbody>
            <tr>
              <td>Amount:</td>
              <td>{quote}</td>
            </tr>
          </tbody>
        </Table>

        <Table>
          <tbody>
            <tr>
              <td>Quantity:</td>
              <td>{qty}</td>
            </tr>
          </tbody>
        </Table>
    </div>

      <div className='transaction-buttons'>
        <Button className='cancel-btn' variant="secondary">Cancel</Button>
        <Button className='continue-submit' variant="primary">Continue</Button>

      </div>
    </div>
  )
}

export default TransactionSummary