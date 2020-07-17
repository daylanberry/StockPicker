import gql from 'graphql-tag';

const GET_NEWS = gql`
  query {
    getNews {
      title
      description
      url
      urlToImage
      lastUpdated
    }
  }
`

export default GET_NEWS