import React from 'react'
import { Table, Button } from 'react-bootstrap'
import './TransactionSummary.css'


const TransactionSummary = ({quote, qty, confirm, handleSubmit, cancelOrder, formatNumber}) => {

  const continueOrSubmit = () => {
    return (
      <Button
        onClick={handleSubmit}
        className='continue-submit'
        variant={confirm ? "success" : "primary"}
      >
        {confirm ? 'Submit' : 'Continue'}
      </Button>
    )
  }

  return (
    <div className='transaction'>
      <h4>
        {
          confirm ? 'Review and Submit' :
          'Transaction Summary'
        }
      </h4>
      <div className='stock-table'>
        <Table>
          <tbody>
            <tr>
              <td>Amount:</td>
              <td>${formatNumber(quote)}</td>
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
        <Button
          className='cancel-btn'
          variant="secondary"
          onClick={cancelOrder}
        >
          Cancel
        </Button>
        {continueOrSubmit()}
      </div>
    </div>
  )
}

export default TransactionSummary