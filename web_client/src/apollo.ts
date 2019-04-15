import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, Resolvers } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

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
    logOut: (_, __, { client }) => {
      localStorage.removeItem('accessToken');
      client.resetStore();
      return { success: true };
    },
    logIn: (_, { accessToken }: { accessToken: string }, { cache }) => {
      localStorage.setItem('accessToken', accessToken);
      cache.writeData({ data: { isLoggedIn: true } });
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
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  if (forward) {
    return forward(operation);
  }
  return null;
});
const authErrorAfterware = onError(({ graphQLErrors, operation }) => {
  if (!graphQLErrors) {
    return;
  }
  if (graphQLErrors.find(err => err.extensions && err.extensions.code === 'UNAUTHENTICATED')) {
    const { cache } = operation.getContext();
    localStorage.removeItem('accessToken');
    cache.reset();
    cache.writeData({
      data: { isLoggedIn: false }
    });
  }
});
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT
});
const link = ApolloLink.from([authMiddleWare, authErrorAfterware, httpLink]);

/**
 * CLIENT
 */
export const client = new ApolloClient({
  cache,
  link,
  resolvers,
  typeDefs
});
client.onResetStore(async () => {
  cache.writeData({
    data: {
      isLoggedIn: Boolean(localStorage.getItem('accessToken')),
      thingInputForm: ''
    }
  });
});
