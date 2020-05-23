import React from 'react'
import './StockInfo.css'

import { Card, Button } from 'react-bootstrap'

class StockInfo extends React.Component {
  constructor(props) {
    super(props)

  }

  priceFormater = (price, change) => {


    let changeToNum = parseFloat(change).toFixed(2)
    let name = parseInt(change) > 0 ? 'positive': 'negative'
    // let arrow = name === 'positive' ? &#8593; : &#8595;

    return (
      <div className='price'>
        <strong>
          ${parseFloat(price).toFixed(2)}
        </strong>
        <span className={name}> {changeToNum}%</span>
      </div>
    )

  }


  render() {
    const { name, change, high, latest, low, open, previous, price, symbol, volume } = this.props.stock

    const { typedName, typedTicker } = this.props

    return (

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
          <div className='card-columns'>
            <div className='card-block'>
              <div>
                Price change: {change}
              </div>
            </div>

            <div className='card-block'>
              <div>
                52 week high: {high}
              </div>
            </div>

          </div>
        </Card.Body>
       </Card>
    )
  }
}

export default StockInfo