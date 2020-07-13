import gql from 'graphql-tag';

const LOGOUT = gql`
  mutation {
    logout {
      name
      email
    }
  }
`

export default LOGOUT