import { ApolloServer } from "apollo-server";
const typeDefs = require("../../../../schema.graphql");
import { Person, Gateways, Thing } from "../../types";
import { getPerson } from "../../usePersons";
import {
  getPersonsThingThisWeek,
  getAllThingsThisWeek,
  submitThing,
  completePersonsThingThisWeek
} from "../../useThings";
import { TypeOrmDatabaseGateway } from "../../gateways/TypeOrmDatabaseGateway";

interface Context {
  gateways: Gateways;
  authInfo: {
    userId: string;
  };
}

type Edge<T, CursorType = string> = {
  cursor: CursorType;
  node: T;
};

type RelayConnection<T, CursorType = string> = {
  edges: Edge<T, CursorType>[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const resolvers = {
  Query: {
    async seatGeekThingsThisWeek(
      _: any,
      __: any,
      { gateways }: Context
    ): Promise<RelayConnection<Thing>> {
      const things = await getAllThingsThisWeek(gateways);
      return {
        edges: things.map(thing => ({
          cursor: thing.id,
          node: thing
        })),
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false
        }
      };
    },
    async me(_: any, __: any, context: Context): Promise<Person> {
      const person = await getPerson(context.gateways, context.authInfo.userId);
      if (!person) {
        throw new Error(
          `Couldnt find person with id ${context.authInfo.userId}`
        );
      }
      return person;
    }
  },
  Mutation: {
    async submitThing(
      _: any,
      args: { description: string },
      context: Context
    ): Promise<{ success: boolean }> {
      await submitThing(
        context.gateways,
        context.authInfo.userId,
        args.description
      );
      return {
        success: true
      };
    },
    async completeThingThisWeek(
      _: any,
      __: any,
      context: Context
    ): Promise<{ success: boolean }> {
      await completePersonsThingThisWeek(
        context.gateways,
        context.authInfo.userId
      );
      return {
        success: true
      };
    }
  },
  Person: {
    async thingThisWeek(
      person: Person,
      _: any,
      { gateways }: Context
    ): Promise<Thing | null> {
      console.log(person);
      return await getPersonsThingThisWeek(gateways, person.id);
    }
  },
  Thing: {
    async person(thing: Thing, _: any, { gateways }: Context): Promise<Person> {
      const person = await getPerson(gateways, thing.personId);
      if (!person) {
        throw new Error(`Couldnt find person for thing ${thing}`);
      }
      return person;
    }
  }
};

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
