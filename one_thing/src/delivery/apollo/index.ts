import { ApolloServer, AuthenticationError } from 'apollo-server';
const typeDefs = require('../../../../schema.graphql');
import resolvers from './resolvers';
import { Gateways } from '../../types';
import { TypeOrmDatabaseGateway } from '../../gateways/TypeOrmDatabaseGateway';
import { Context } from './types';
import { parseJWT } from './auth';
import { Request } from 'express';
import Auth0Gateway from '../../gateways/auth0Gateway';
import { login } from '../../useAuth';

type MakeApolloServerOptions = {
  dev?: boolean;
  auth0ClientId?: string;
  auth0ClientSecret?: string;
  postgresUrl?: string;
};

export function makeApolloServer({
  dev = false,
  auth0ClientId = 'auth0_client_id',
  auth0ClientSecret = 'auth0_client_secret',
  postgresUrl
}: MakeApolloServerOptions) {
  const gateways: Gateways = {
    databaseGateway: new TypeOrmDatabaseGateway({ dev, postgresUrl }),
    auth0Gateway: new Auth0Gateway(auth0ClientId, auth0ClientSecret)
  };
  return new ApolloServer({
    typeDefs,
    resolvers,
    ...(dev ? devOptions : {}),
    context: async ({ req }): Promise<Context> => {
      const auth0UserId = await getAuth0UserId(req);
      const person = await login(gateways, auth0UserId);
      return {
        gateways,
        authInfo: {
          person
        }
      };
    }
  });
}

/**
 * Throws AuthenticationError on failure to get user.
 * @param request Request from express server
 */
async function getAuth0UserId(request: Request): Promise<string> {
  if (!request.headers.authorization) {
    throw new AuthenticationError('Missing bearer token.');
  }

  const match = request.headers.authorization.match(/Bearer (.*)/);
  const accessToken = match && match[1];
  if (!accessToken) {
    throw new AuthenticationError('Invalid Bearer token');
  }

  let jwtBody: { sub: string } | null;
  try {
    jwtBody = await parseJWT(accessToken);
  } catch (err) {
    throw new AuthenticationError('Couldnt parse access token.');
  }
  return jwtBody.sub;
}

const devOptions = {
  formatError: (error: any) => {
    console.log(error);
    return error;
  },
  formatResponse: (response: any) => {
    console.log(response);
    return response;
  },
  playground: true
};
