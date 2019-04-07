import { ApolloServer } from "apollo-server";
const typeDefs = require("../../../../schema.graphql");
import resolvers from "./resolvers";
import { Gateways } from "../../types";
import { TypeOrmDatabaseGateway } from "../../gateways/TypeOrmDatabaseGateway";
import { Context } from "./types";

export function makeApolloServer() {
  const gateways: Gateways = {
    databaseGateway: new TypeOrmDatabaseGateway()
  };
  return new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => {
      console.log(error);
      return error;
    },
    formatResponse: (response: any) => {
      console.log(response);
      return response;
    },
    playground: true,
    context: async ({ req }): Promise<Context> => {
      return {
        gateways,
        authInfo: {
          userId: "1"
        }
      };
    }
  });
}
