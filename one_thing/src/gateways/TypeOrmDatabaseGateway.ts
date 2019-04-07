import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Connection,
  ConnectionManager,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Thing, Person, DatabaseGateway, QueryOptions } from "../types";

export class TypeOrmDatabaseGateway implements DatabaseGateway {
  private connection!: Connection;

  constructor() {
    const connectionManager = new ConnectionManager();
    connectionManager
      .create({
        type: "sqlite",
        database: "one-thing.sqlite",
        entities: [ThingModel, PersonModel],
        synchronize: true,
        logging: true
      })
      .connect()
      .then(connection => {
        this.connection = connection;
      });
  }

  async fetchThings(options?: QueryOptions): Promise<Thing[]> {
    let query = this.connection
      .getRepository(ThingModel)
      .createQueryBuilder("thing");
    if (options && options.from) {
      query.andWhere("thing.createdAt > :from", { from: options.from });
    }
    if (options && options.to) {
      // can't figure out why this is breaking this query
      // query.andWhere("thing.createdAt < :to", { to: options.to });
    }
    return await query.getMany();
  }

  async fetchThingsOfPerson(
    personId: string,
    options?: QueryOptions
  ): Promise<Thing[]> {
    let query = this.connection
      .getRepository(ThingModel)
      .createQueryBuilder("thing")
      .where("thing.personId = :personId", { personId });
    if (options && options.from) {
      query = query.andWhere("createdAt > :from", { from: options.from });
    }
    if (options && options.to) {
      // breaking
      // query = query.andWhere("createdAt < :to", { to: options.to });
    }
    return await query.getMany();
  }

  async addThing(personId: string, description: string): Promise<Thing> {
    let thingInput = new ThingModel();
    thingInput.personId = personId;
    thingInput.description = description;
    return await this.connection.getRepository(ThingModel).save(thingInput);
  }

  async setThingComplete(thingId: string): Promise<null> {
    await this.connection
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
    const query = this.connection
      .getRepository(PersonModel)
      .createQueryBuilder("person")
      .select()
      .where("id = :id", { id: personId });
    const person = await query.getOne();
    return person || null;
  }
}

@Entity({ name: "things" })
class ThingModel implements Thing {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  personId!: string;

  @Column()
  description!: string;

  @Column({ default: false })
  complete!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity({ name: "persons" })
class PersonModel implements Person {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
