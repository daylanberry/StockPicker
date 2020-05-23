import React from 'react'
import './StockInfo.css'

class StockInfo extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {
    // const { name, change, high, latest, low, open, previous, price, symbol, volume } = this.props.stock
    console.log(this.props)

    return (
      <div className='selectedStock'>
        {/* <h3>
          <span style={{fontWeight: 400}}>{name} </span>
          <strong>({symbol})</strong>
        </h3>

        price: {price} */}

      </div>
    )
  }
}

export default StockInfo