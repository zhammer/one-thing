import { RelayConnection, Context } from './types';
import { Thing, Person } from '../../types';
import {
  getAllThingsThisWeek,
  submitThing,
  completePersonsThingThisWeek,
  getPersonsThingThisWeek
} from '../../useThings';
import { getPerson } from '../../usePersons';

export default {
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
      return context.authInfo.person;
    }
  },
  Mutation: {
    async submitThing(
      _: any,
      args: { description: string },
      context: Context
    ): Promise<{ success: boolean }> {
      await submitThing(context.gateways, context.authInfo.person.id, args.description);
      return {
        success: true
      };
    },
    async completeThingThisWeek(_: any, __: any, context: Context): Promise<{ success: boolean }> {
      await completePersonsThingThisWeek(context.gateways, context.authInfo.person.id);
      return {
        success: true
      };
    }
  },
  Person: {
    async thingThisWeek(person: Person, _: any, { gateways }: Context): Promise<Thing | null> {
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
