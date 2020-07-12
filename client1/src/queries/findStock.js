import gql from 'graphql-tag';

const FIND_STOCK = gql`
  query FindStock($ticker: String) {
    findStock(ticker: $ticker) {
      id
      name
      ticker
      qty
    }
  }
`

export default FIND_STOCK