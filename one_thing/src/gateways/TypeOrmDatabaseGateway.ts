import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Connection,
  ConnectionManager,
  getConnection
} from "typeorm";
import { Thing, Person, DatabaseGateway, QueryOptions } from "../types";

export class TypeOrmDatabaseGateway implements DatabaseGateway {
  private connector: Connection;
  private async getConnection() {
    return await this.connector.connect();
  }

  constructor() {
    const connectionManager = new ConnectionManager();
    this.connector = connectionManager.create({
      type: "sqlite",
      database: "one-thing-sqlite",
      entities: [__filename],
      synchronize: true
    });
  }

  async fetchThings(options?: QueryOptions): Promise<Thing[]> {
    const connection = await getConnection();
    let query = connection
      .getRepository(ThingModel)
      .createQueryBuilder("thing");
    if (options && options.from) {
      query = query.where("thing.createdAt > :from", { from: options.from });
    }
    if (options && options.to) {
      query = query.where("thing.createdAt < :to", { to: options.to });
    }
    return await query.getMany();
  }

  async fetchThingsOfPerson(
    personId: string,
    options?: QueryOptions
  ): Promise<Thing[]> {
    const connection = await getConnection();
    let query = connection
      .getRepository(ThingModel)
      .createQueryBuilder()
      .where("thing.personId = :personId", { personId });
    if (options && options.from) {
      query = query.where("thing.createdAt > :from", { from: options.from });
    }
    if (options && options.to) {
      query = query.where("thing.createdAt < :to", { to: options.to });
    }
    return await query.getMany();
  }

  async addThing(personId: string, description: string): Promise<Thing> {
    const connection = await getConnection();
    let thingInput = new ThingModel();
    thingInput.personId = personId;
    thingInput.description = description;
    return await connection.getRepository(ThingModel).save(thingInput);
  }

  async setThingComplete(thingId: string): Promise<null> {
    const connection = await getConnection();
    await connection
      .createQueryBuilder()
      .update(ThingModel)
      .set({
        complete: true
      })
      .where("id = :id", { id: thingId })
      .execute();
    return null;
  }

  async fetchPerson(personId: string): Promise<Person | null> {
    const connection = await getConnection();
    const query = connection
      .getRepository(PersonModel)
      .createQueryBuilder()
      .select()
      .where("id = :id", { id: personId });
    const person = await query.getOne();
    return person || null;
  }
}

@Entity()
class ThingModel implements Thing {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  personId!: string;

  @Column()
  description!: string;

  @Column()
  complete!: boolean;

  @Column()
  createdAt!: Date;
}

@Entity()
class PersonModel implements Person {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;
}
