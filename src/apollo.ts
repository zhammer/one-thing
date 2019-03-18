import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, Resolvers } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || '/graphql';

/**
 * TYPE DEFS
 */
const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
  type Mutation {
    logOut: MutationResult!
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
});

/**
 * RESOLVERS
 */
const resolvers: Resolvers = {
  Query: {
    isLoggedIn: (_, __, { cache }) => cache.isLoggedIn
  },
  Mutation: {
    logOut: (_, __, { cache }) => {
      localStorage.removeItem('accessToken');
      cache.writeData({ data: { isLoggedIn: false } });
      return { success: true };
    }
  }
};

/**
 * LINK
 */
const link = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    authorization: localStorage.getItem('accessToken')
  }
});

/**
 * CLIENT
 */
export const client = new ApolloClient({
  cache,
  link,
  resolvers,
  typeDefs
});
