import React from 'react'
import './StockInfo.css'
import StockStats from './StockStats'

import { Card, Button } from 'react-bootstrap'

class StockInfo extends React.Component {
  constructor(props) {
    super(props)

  }

  numberWithCommas = (n) => {
    const num = parseFloat(n).toFixed(2)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  priceFormater = (price, change) => {

    const formatedPrice = this.numberWithCommas(price)

    let changeToNum = parseFloat(change).toFixed(2)
    let name = parseInt(change) > 0 ? 'positive': 'negative'
    let arrow = name === 'positive' ? <span>&#8593;</span> :
    <span>&#8595;</span>

    return (
      <div className='price'>
        <strong>
          ${formatedPrice}
        </strong>
        <span className={name}> {changeToNum}% {arrow}</span>
      </div>
    )

  }


  render() {
    const { name, change, high, latest, low, open, previous, price, symbol, volume } = this.props.stock

    const { typedName, typedTicker } = this.props

    return (
      <div>
      <Card className='stockInfo'>
        <Card.Header>
          <span>{name} </span>
          <strong>({symbol})</strong>
          <div>
            <span style={{fontWeight: 10}}>
              {latest}
            </span>
          </div>

        </Card.Header>
        {this.priceFormater(price, change)}

        <Card.Body>
          <Card.Title>Stock Information</Card.Title>
            <StockStats formatNumber={this.numberWithCommas} {...this.props.stock}/>

            <button>Get Quote</button>
        </Card.Body>
       </Card>

      </div>

    )
  }
}

export default StockInfo

