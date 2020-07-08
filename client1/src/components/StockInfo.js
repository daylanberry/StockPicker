import React from 'react'
import './StockInfo.css'
import StockStats from './StockStats'
import QuoteOrBuy from './QuoteOrBuy'
import * as helpers from './utils'

import { Card } from 'react-bootstrap'

class StockInfo extends React.Component {
  constructor(props) {
    super(props)

  }


  priceFormater = (price, change) => {

    if (!change) change = 0

    const formatedPrice = helpers.numberFormatter(price)

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

    const { change, latest, price, symbol } = this.props.stock
    const { name } = this.props

    console.log(change)

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

          {
            change ?
            <StockStats
              formatNumber={helpers.numberFormatter}
              {...this.props.stock}
            /> : <div style={{marginTop: '20px'}}></div>
          }

            <QuoteOrBuy
              price={Number(price)}
              name={name}
              ticker={symbol}
            />

        </Card.Body>
       </Card>

      </div>
    )
  }
}

export default StockInfo

