import { Thing, Person, DatabaseGateway, QueryOptions } from "../types";

export class InMemoryDatabaseGateway implements DatabaseGateway {
  private counter: number = 1;
  things: Thing[] = [
    {
      id: "1",
      personId: "2",
      description: "Hang out with Zach!",
      complete: true,
      createdAt: new Date()
    }
  ];
  persons: Person[] = [
    {
      id: "1",
      firstName: "Zach",
      lastName: "Hammer",
      email: "zhammer@seatgeek.com"
    },
    {
      id: "2",
      firstName: "Chris",
      lastName: "Gray",
      email: "cgray@seatgeek.com"
    }
  ];

  async fetchThings(options?: QueryOptions): Promise<Thing[]> {
    return this.things;
  }

  async fetchThingsOfPerson(
    personId: string,
    options?: QueryOptions
  ): Promise<Thing[]> {
    return this.things.filter(thing => thing.personId === personId);
  }

  async addThing(personId: string, description: string): Promise<Thing> {
    const id = ++this.counter;
    const thing: Thing = {
      id: id.toString(),
      personId,
      description,
      complete: false,
      createdAt: new Date()
    };
    this.things = [...this.things, thing];
    return thing;
  }

  async setThingComplete(thingId: string): Promise<null> {
    this.things = this.things.map(thing => ({
      ...thing,
      complete: thing.id === thingId ? true : thing.complete
    }));
    return null;
  }

  async fetchPerson(personId: string): Promise<Person | null> {
    const person = this.persons.find(person => person.id === personId);
    return person || null;
  }
}
