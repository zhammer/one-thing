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

/**
 * RESOLVERS
 */
const resolvers: Resolvers = {
  Query: {
    isLoggedIn: () => Boolean(localStorage.getItem('accessToken'))
  },
  Mutation: {
    logOut: () => {
      localStorage.removeItem('accessToken');
    }
  }
};

/**
 * CLIENT
 */
export const client = new ApolloClient({
  cache,
  resolvers,
  typeDefs
});
