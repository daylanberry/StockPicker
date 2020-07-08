import React, { useState, useEffect } from 'react'
import './QuoteOrBuy.css'
import TransactionSummary from './TransactionSummary'

import { Button } from 'react-bootstrap'
import SubmittedModal from './SubmittedModal'

import { useMutation, useQuery } from '@apollo/react-hooks';
import ADD_UPDATE_STOCK from '../mutations/addUpdateStock'
import SET_AVAILABLE_BALANCE from '../mutations/setAvailableBal'
import CURRENT_USER from '../queries/currentUser'

const QuoteOrBuy = ({ price, name, ticker, buy, toggle }) => {

  const [confirm, toggleConfirm] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [qty, setQty] = useState(0)
  const [quotedAmount, setQuotedAmount] = useState(0)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [user, setUser] = useState({})

  const [addUpdateStock] = useMutation(ADD_UPDATE_STOCK)
  const [setAvailableBal] = useMutation(SET_AVAILABLE_BALANCE)
  const {loading, error, data} = useQuery(CURRENT_USER)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSubmit(false)
      if (loadingSubmit) {
        setSuccessModal(true)
      }
      newOrder()
    }, 1000);

  return () => clearTimeout(timer);
}, [loadingSubmit]);


  const calculatePrice = (type) => {

    if (qty > 0) {
      let quotedAmount = +(qty * price).toFixed(2)
      setQuotedAmount(quotedAmount)
    }
  }

  const handleChange = (e) => {
    let newQty = Number(e.target.value)
    setQty(newQty)
    setQuotedAmount(0)
  }

  const handleSubmit = () => {
    let currentPrice = Number(price.toFixed(2))
    let addOrSubtractFromAvailable = buy ? -(currentPrice * qty) : currentPrice * qty

    if (!confirm) {
      toggleConfirm(true)

    } else {

      let stockObj = {
        name,
        ticker,
        price: currentPrice,
        qty: buy ? qty : -qty
      }

      if (buy) {
        addUpdateStock({variables: stockObj})
      } else {

      }

      setAvailableBal({variables: {balance: addOrSubtractFromAvailable}})
      setLoadingSubmit(true)
    }

  }

  const newOrder = () => {
    toggleConfirm(false)
    setQuotedAmount(0)
    setQty(0)

  }

  return (
    <div>
      <div className='quote-option'>
        {
          successModal ?
          <SubmittedModal
            show={successModal}
            close={setSuccessModal}
          />
          : null
        }

        <div>
          Shares:
          <input
            className='shares-input'
            type='text'
            type='number'
            value={qty > 0 ? qty : ''}
            onChange={handleChange}
          />
        </div>
        <Button onClick={calculatePrice}>
          {
            buy ? 'Get Quote' : 'Sell Shares'
          }
        </Button>
      </div>

      {
        quotedAmount > 0 || loadingSubmit ?
        <TransactionSummary
          quote={quotedAmount}
          qty={qty}
          confirm={confirm}
          handleSubmit={handleSubmit}
          cancelOrder={newOrder}
          loadingSubmit={loadingSubmit}
          buy={buy}
          user={data ? data.currentUser : null}
        /> :
        null

      }
    </div>
  )

}

export default QuoteOrBuy