import gql from 'graphql-tag';


const ADD_BALANCE = gql`
  mutation SetBalance($balance: Float) {
    setBalance(balance: $balance) {
      email
      avalBalance
      id
    }
  }
`

export default ADD_BALANCE