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
    let newQty = Number(e.target.value)
    this.setState({
      qty: newQty,
      quotedAmount: 0
    })
  }

  handleSubmit = () => {

    const { confirm } = this.state;

    if (!confirm) {
      this.setState({
        confirm: true
      })
    } else {
      console.log('submitted')
    }
  }

  cancelOrder = () => {

    this.setState({
      confirm: false,
      quotedAmount: 0,
      qty: 0
    })
  }



  render() {
    const { quotedAmount, button, cost, qty, confirm } = this.state
    const { formatNumber } = this.props

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

        {
          quotedAmount > 0 ?
          <TransactionSummary
            quote={quotedAmount}
            qty={qty}
            confirm={confirm}
            handleSubmit={this.handleSubmit}
            cancelOrder={this.cancelOrder}
            formatNumber={formatNumber}
          /> :
          null

        }
      </div>
    )
  }
}

export default QuoteOrBuy