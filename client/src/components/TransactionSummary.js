import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'

import ErrorMessage from './ErrorMessage'
import './TransactionSummary.css'
import Loading from './Loading'
import * as helpers from './utils'

const TransactionSummary = ({quote, qty, confirm, handleSubmit, cancelOrder, formatNumber, loadingSubmit, user, buy, stockData}) => {

  const [ showHoverMsg, toggleShowHoverMsg ] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      if (user.avalBalance < quote && buy && !loadingSubmit) {
        setError('You need more funds')
      } else {
        setError('')
      }
    }
  }, [user, buy])

  useEffect(() => {
    if (stockData && !buy) {
      let holdingQty = stockData.findStock ? stockData.findStock.qty : 0
      if (holdingQty < qty && !loadingSubmit) {
        setError("You don't own this many shares")
      } else {
        setError('')
      }
    }
  }, [stockData, qty, buy])

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
          &#128540;
          &#10060;
        </Button>
      )
    }
    return (
      <Button
        style={{marginBotton: '20px'}}
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
      <div style={{alignItems: 'center', justifyContent: 'center'}}>
        <h5>
          {
            confirm ? 'Review and Submit' :
            'Transaction Summary'
          }
        </h5>
      </div>

      <div className='stock-table'>
        <Table style={{width: '50%'}}>
          <tbody>
            <tr>
              <td>Amount:</td>
              <td>${helpers.numberFormatter(quote)}</td>
            </tr>
          </tbody>
        </Table>

        <Table style={{width: '50%'}}>
          <tbody>
            <tr>
              <td>Quantity:</td>
              <td>{qty}</td>
            </tr>
          </tbody>
        </Table>
    </div>
      <div className='transaction'>
        <div className='transaction-buttons'>
          <Button
          variant="secondary"
          className='cancel'
          onClick={cancelOrder}
        >
          Cancel
        </Button>

        {
          error.length ? <ErrorMessage error={error} /> : continueOrSubmit()
        }

        {
          showHoverMsg ? <ErrorMessage error='You must be logged in to do that!'/> : null
        }

        </div>
      </div>

    </div>
  )
}

export default TransactionSummary