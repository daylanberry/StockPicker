import gql from 'graphql-tag';

const UPDATE_USER_ASSETS = gql`
  mutation UpdateUserAssets {
    updateUserAssets {
      avalBalance
      assets
    }
  }
`

export default UPDATE_USER_ASSETS