import gql from 'graphql-tag';


const SET_AVAILABLE_BALANCE = gql`
  mutation SetBalance($balance: Float) {
    setBalance(balance: $balance) {
      email
      avalBalance
      id
    }
  }
`

export default SET_AVAILABLE_BALANCE