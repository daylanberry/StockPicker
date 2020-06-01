import React from 'react'
import './QuoteOrBuy.css'


class QuoteOrBuy extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      button: 'Get Quote',
      quoteType: 'Shares',
      confirm: false
    }
  }

  setQuoteType = (type) => {
    if (type === 'Shares') {
      this.setState({ quoteType: 'Dollars'})
    } else {
      this.setState({ quoteType: 'Shares'})
    }
  }


  render() {
    const { quoteType } = this.state
    return (
      <div className='quote-option'>
        <div>
          {quoteType}:
          <input
            className='shares-input'
            type='text'
          />
        </div>
        <span
          className='dollar-option'
          onClick={() => this.setQuoteType(quoteType)}
        >
          {
            quoteType === 'Shares' ?
            "Switch to $ amount" :
            "Switch to share qty"
          }

        </span>
      </div>
    )
  }
}

export default QuoteOrBuy