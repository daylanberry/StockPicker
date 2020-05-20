import gql from 'graphql-tag';


const SIGN_UP = gql`
  mutation SignUpUser($name: String $email: String $password: String) {
    signup(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`

export default SIGN_UP