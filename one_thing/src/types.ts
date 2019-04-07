export interface Gateways {
  databaseGateway: DatabaseGateway;
}

export interface ThingInput {
  personId: string;
  description: string;
}

export interface Thing {
  id: string;
  personId: string;
  description: string;
  complete: boolean;
  createdAt: Date;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type QueryOptions = {
  from?: Date;
  to?: Date;
};

export interface DatabaseGateway {
  fetchThings: (options?: QueryOptions) => Promise<Thing[]>;
  fetchThingsOfPerson: (
    personId: string,
    options?: QueryOptions
  ) => Promise<Thing[]>;
  addThing: (personId: string, description: string) => Promise<Thing>;
  setThingComplete: (thingId: string) => Promise<null>;
  fetchPerson: (personId: string) => Promise<Person | null>;
}
