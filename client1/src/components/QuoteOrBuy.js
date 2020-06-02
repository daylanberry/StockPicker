import React from 'react'
import './QuoteOrBuy.css'
import TransactionSummary from './TransactionSummary'
import { Button } from 'react-bootstrap'

class QuoteOrBuy extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      confirm: false,
      qty: 0,
      quotedAmount: 0
    }
  }


  calculatePrice = (type) => {
    const { qty } = this.state
    const { price } = this.props

    if (qty > 0) {
      let quotedAmount = +(qty * price).toFixed(2)
      this.setState({ quotedAmount })
    }
  }

  handleChange = (e) => {
    this.setState({
      qty: Number(e.target.value)
    })
  }




  render() {
    const { quotedAmount, button, cost, qty } = this.state
    return (
      <div>
        <div className='quote-option'>
          <div>
            Shares:
            <input
              className='shares-input'
              type='text'
              type='number'
              value={qty > 0 ? qty : ''}
              onChange={this.handleChange}
            />
          </div>
            <Button onClick={this.calculatePrice}>Get Quote</Button>
        </div>
        <TransactionSummary
          quote={quotedAmount}
          qty={qty}
        />

      </div>
    )
  }
}

export default QuoteOrBuy