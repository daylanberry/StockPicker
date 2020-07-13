import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation LoginUser($email: String $password: String) {
    login(email: $email, password: $password) {
      id
      email
      avalBalance
      assets
    }
  }
`

export default LOGIN_USER