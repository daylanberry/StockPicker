import React, { useState } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'
import './TransactionSummary.css'
import Loading from './Loading'

const TransactionSummary = ({quote, qty, confirm, handleSubmit, cancelOrder, formatNumber, loadingSubmit, user}) => {

  const [ showHoverMsg, toggleShowHoverMsg ] = useState(false)

  const continueOrSubmit = () => {
    let isDisabled = user ? false : true

    if (loadingSubmit) return <Loading />

    if (isDisabled) {
      return (
        <Button
          onMouseEnter={() => toggleShowHoverMsg(true)}
          onMouseLeave={() => toggleShowHoverMsg(false)}
          className='continue-submit'
          variant='warning'
        >
          Continue
        </Button>
    )

    }

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



  const hoverMessage = () => {
    let message = 'You must be logged in to do that!'

    return (
      <Alert variant='warning' className='warning'>
        {message}
      </Alert>
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
        {
          showHoverMsg ? hoverMessage() : null
        }
      </div>
    </div>
  )
}

export default TransactionSummary