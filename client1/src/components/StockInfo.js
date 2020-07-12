import React from 'react'
import './StockInfo.css'
import StockStats from './StockStats'
import QuoteOrBuy from './QuoteOrBuy'
import * as helpers from './utils'

import { Card, Dropdown } from 'react-bootstrap'

class StockInfo extends React.Component {

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
    const { name, buy, toggle } = this.props

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
          <Card.Title style={{display: 'flex', justifyContent: 'center'}}>
            <span style={{fontWeight: '2', marginTop: '5px'}}>
              Transaction Type:
            </span>

            <Dropdown style={{marginLeft: '10px', marginBottom: '6px'}}>
            <Dropdown.Toggle variant="primary">
              {buy ? 'Buy' : 'Sell'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => toggle()}>
                {!buy ? 'Buy' : 'Sell'}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          </Card.Title>
            <StockStats
              formatNumber={helpers.numberFormatter}
              {...this.props.stock}
            />

            <QuoteOrBuy
              price={Number(price)}
              name={name}
              buy={buy}
              ticker={symbol}
              toggle={toggle}
            />

        </Card.Body>
       </Card>

      </div>
    )
  }
}

export default StockInfo

