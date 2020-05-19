import gql from 'graphql-tag';

const CURRENT_USER = gql`
  query {
    currentUser {
      id
      name
      email
    }
  }
`

export default CURRENT_USER