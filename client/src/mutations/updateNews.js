import gql from 'graphql-tag';

const UPDATE_NEWS = gql`
  mutation {
    updateNews {
      title
      description
    }
  }
`

export default UPDATE_NEWS