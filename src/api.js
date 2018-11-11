import fetch from 'isomorphic-fetch'
import { createApolloFetch } from 'apollo-fetch'

const uri = 'http://localhost:5000/graphql'
const apolloFetch = createApolloFetch({ uri })

export function fetchUsers() {
  return fetch('https://randomuser.me/api/?results=5')
    .then(res => res.json())
    .then(res => res.results)
}

export const getEvents = ({limit, cursor}) => {
  const query = `
    query($cursor: String, $limit: Int!) {
      events(cursor: $cursor, limit: $limit){
        edges {
          id
          title
          slug
          description
          createdAt
          user {
            id
            username
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `
  return apolloFetch({query, variables: {limit, cursor}})
} 

export const getEventById = `
  query($id: ID!) {
    event(id: $id) {
      title
      description
      createdAt
      user {
        id
        username
        email
      }
    }
  }
`