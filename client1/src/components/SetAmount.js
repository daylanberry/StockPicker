import React, { useState, useEffect } from 'react'
import { InputGroup, FormControl, Button, Alert } from 'react-bootstrap'

import './SetAmount.css'

const SetAmount = (props) => {

  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const submitAmount = () => {
    let balance = Number(amount)

    if (isNaN(balance)) {
      setError('This is not a valid number')
      return
    }


  }

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  return (
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
        error.length ? <Alert className='amount-error' variant='danger'>{error}</Alert> : null
      }

    </div>
  )
}

export default SetAmount