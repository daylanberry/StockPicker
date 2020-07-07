import gql from 'graphql-tag';

const GET_USER_STOCKS = gql`
  query {
    getUserStock {
      name,
      ticker,
      costPerShare,
      qty,
      totalCost,
      currentPrice,
      id
    }
  }
`

export default GET_USER_STOCKS