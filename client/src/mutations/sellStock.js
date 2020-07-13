import gql from 'graphql-tag';

const SELL_STOCK = gql`
  mutation SellStock($ticker: String, $qty: Int) {
    sellStock(ticker: $ticker, qty: $qty) {
      name
      qty
      ticker
    }
  }
`

export default SELL_STOCK