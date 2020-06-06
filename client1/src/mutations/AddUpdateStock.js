import gql from 'graphql-tag';

const ADD_UPDATE_STOCK = gql`
  mutation AddStock($name: String, $ticker: String, $price: Float, $qty: Int) {
    addStock(name: $name, ticker: $ticker, price: $price, qty: $qty) {
      name
      ticker
      costPerShare
      qty
      totalCost
      currentPrice
    }
  }
`

export default ADD_UPDATE_STOCK