import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, Resolvers } from 'apollo-client';

/**
 * TYPE DEFS
 */
const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
  extend type Mutation {
    logOut: null
  }
`;

/**
 * CACHE
 */
const cache = new InMemoryCache();
cache.writeData({
  data: {
    isLoggedIn: Boolean(localStorage.getItem('accessToken'))
  }
})

/**
 * RESOLVERS
 */
const resolvers: Resolvers = {
  Query: {
    isLoggedIn: (_, __, { cache }) => cache.isLoggedIn,
  },
  Mutation: {
    logOut: (_, __, { cache }) => {
      localStorage.removeItem('accessToken');
      cache.writeData({ data: { isLoggedIn: false }});
    }
  },
}

/**
 * CLIENT
 */
export const client = new ApolloClient({
  cache,
  resolvers,
  typeDefs,
});
