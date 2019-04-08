import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Connection,
  ConnectionManager,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index
} from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Thing, Person, DatabaseGateway, QueryOptions } from '../types';

const devOptions = {
  synchronize: true,
  logging: true
};

export class TypeOrmDatabaseGateway implements DatabaseGateway {
  private connection!: Connection;

  constructor(options: { dev: boolean; postgresUrl?: string }) {
    const connectionManager = new ConnectionManager();
    const dbConfig:
      | { type: 'postgres'; url: string }
      | { type: 'sqlite'; database: string } = options.postgresUrl
      ? { type: 'postgres', url: options.postgresUrl }
      : { type: 'sqlite', database: 'one-thing.sqlite' };
    connectionManager
      .create({
        namingStrategy: new SnakeNamingStrategy(),
        ...dbConfig,
        entities: [ThingModel, PersonModel],
        ...(options.dev ? devOptions : {})
      })
      .connect()
      .then(connection => {
        this.connection = connection;
      });
  }

  async fetchThings(options?: QueryOptions): Promise<Thing[]> {
    let query = this.connection.getRepository(ThingModel).createQueryBuilder('thing');
    if (options && options.from) {
      query.andWhere('thing.created_at > :from', { from: options.from });
    }
    if (options && options.to) {
      console.warn('`to` date is being ignored at the moment.');
      // query.andWhere("thing.created_at < :to", { to: options.to });
    }
    return await query.getMany();
  }

  async fetchThingsOfPerson(personId: string, options?: QueryOptions): Promise<Thing[]> {
    let query = this.connection
      .getRepository(ThingModel)
      .createQueryBuilder('thing')
      .where('thing.person_id = :personId', { personId });
    if (options && options.from) {
      query = query.andWhere('created_at > :from', { from: options.from });
    }
    if (options && options.to) {
      console.warn('`to` date is being ignored at the moment.');
      // query = query.andWhere("created_at < :to", { to: options.to });
    }
    return await query.getMany();
  }

  async addThing(personId: string, description: string): Promise<Thing> {
    let thingInput = new ThingModel();
    thingInput.personId = personId;
    thingInput.description = description;
    return await this.connection.getRepository(ThingModel).save(thingInput);
  }

  async addPerson(
    auth0UserId: string,
    email: string,
    firstName: string,
    lastName: string
  ): Promise<Person> {
    const personInput = new PersonModel();
    personInput.auth0UserId = auth0UserId;
    personInput.email = email;
    personInput.firstName = firstName;
    personInput.lastName = lastName;
    return await this.connection.getRepository(PersonModel).save(personInput);
  }

  async setThingComplete(thingId: string): Promise<null> {
    await this.connection
      .createQueryBuilder()
      .update(ThingModel)
      .set({
        complete: true
      })
      .where('id = :id', { id: thingId })
      .execute();
    return null;
  }

  async fetchPerson(personId: string): Promise<Person | null> {
    const query = this.connection
      .getRepository(PersonModel)
      .createQueryBuilder('person')
      .select()
      .where('id = :id', { id: personId });
    const person = await query.getOne();
    return person || null;
  }

  async fetchPersonByAuth0UserId(auth0UserId: string): Promise<Person | null> {
    const query = this.connection
      .getRepository(PersonModel)
      .createQueryBuilder('person')
      .select()
      .where('auth0_user_id = :auth0UserId', { auth0UserId });
    return (await query.getOne()) || null;
  }
}

@Entity({ name: 'things' })
class ThingModel implements Thing {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  personId!: string;

  // https://typeorm.io/#/relations-faq/how-to-use-relation-id-without-joining-relation
  @ManyToOne(type => PersonModel)
  person!: PersonModel;

  @Column()
  description!: string;

  @Column({ default: false })
  complete!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity({ name: 'persons' })
class PersonModel implements Person {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  @Index()
  auth0UserId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
