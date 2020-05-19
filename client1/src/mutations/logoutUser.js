import gql from 'graphql-tag';

const LOGOUT = gql`
  mutation {
    logout {
      name
    }
  }
`

export default LOGOUT