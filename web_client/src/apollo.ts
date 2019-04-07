import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, Resolvers } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || '/graphql';

/**
 * TYPE DEFS
 */
const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    thingInputForm: String!
  }
  extend type Mutation {
    logOut: MutationResult!
    logIn(accessToken: String!): MutationResult!
    setThingInputForm(text: String!): MutationResult!
  }
`;

/**
 * CACHE
 */
const cache = new InMemoryCache();
cache.writeData({
  data: {
    isLoggedIn: Boolean(localStorage.getItem('accessToken')),
    thingInputForm: ''
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
    },
    logIn: (_, { accessToken }: { accessToken: string }, { cache }) => {
      localStorage.setItem('accessToken', accessToken);
      cache.writeData({ data: { isLoggedIn: true } });
      return { success: true };
    },
    setThingInputForm: (_, data, { cache }) => {
      cache.writeData({ data: { thingInputForm: data.text } });
      return { success: true };
    }
  }
};

/**
 * LINK
 */
const authMiddleWare = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('accessToken')
    }
  });
  if (forward) {
    return forward(operation);
  }
  return null;
});
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT
});

/**
 * CLIENT
 */
export const client = new ApolloClient({
  cache,
  link: concat(authMiddleWare, httpLink),
  resolvers,
  typeDefs
});
