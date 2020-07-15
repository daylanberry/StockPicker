import React, { useState, useEffect } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

import ErrorMessage from './ErrorMessage'

import SET_AVAILABLE_BALANCE from '../mutations/setAvailableBal'
import { useMutation } from '@apollo/react-hooks'

import './AddFunds.css'

const SetAmount = (props) => {

  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState({})

  const [setAvailableBal] = useMutation(SET_AVAILABLE_BALANCE)

  useEffect(() => {
    if (props.data) {
      if (!props.data.currentUser) {
        setError('You need to be logged in')
      } else {
        setError('')
      }
    }
  }, [user])

  const submitAmount = () => {
    let balance = parseFloat(amount)

    if (isNaN(balance)) {
      setError('This is not a valid number')
      return
    }

    if (props.data) {
      if (props.data.currentUser) {
        setAvailableBal({
          variables: { balance }
        })

        props.history.push('/')
      }
    }

  }

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  return (
    <div className='amt-container'>
    <div className='set-amount'>
      <h4>Enter Amount</h4>
      <div className='bal-input-container'>
        <span className='amount-title'>Balance:</span>
        <div className='amount-input'>
          <InputGroup className="sm-3">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='text'
              value={amount}
              onChange={handleChange}
            />
          </InputGroup>
        </div>
        <Button
          style={{height: '40px'}}
          onClick={submitAmount}
        >
          Trade!
        </Button>
      </div>

        {
          error.length ? (
            <div className='amount-error'>
              <ErrorMessage error={error}>
              </ErrorMessage>
            </div>
          )
          : null
        }

    </div>

    </div>

  )
}

export default SetAmount