import gql from 'graphql-tag';

const CURRENT_USER = gql`
  query {
    currentUser {
      id
      email
      avalBalance
      assets
    }
  }
`

export default CURRENT_USER